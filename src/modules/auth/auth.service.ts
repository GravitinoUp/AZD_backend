import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { AuthDto, CreateAuthDto } from './dto/auth.dto'
import { Auth } from './entities/auth.entity'
import { sign, verify } from 'jsonwebtoken'
import { ConfigService } from '@nestjs/config'
import { AuthResponse, StatusAuthResponse } from './response'
import { InjectRepository } from '@nestjs/typeorm'
import { UserService } from '../user/user.service'
import { Repository } from 'typeorm'
import { I18nService } from 'nestjs-i18n'
import { UserResponse } from '../user/response'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
    private readonly usersService: UserService,
    private readonly configService: ConfigService,
    private readonly i18n: I18nService,
  ) {}

  async create(createAuthDto: CreateAuthDto): Promise<Auth> {
    try {
      const newAuth = await this.authRepository
        .createQueryBuilder()
        .insert()
        .values({ ...createAuthDto })
        .returning('*')
        .execute()

      const result = newAuth.raw[0]

      return result
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? 500)
    }
  }

  async login(auth: AuthDto, values: { userAgent: string; ipAddress: string }) {
    try {
      const loginData = await this.usersService.authByEmail(auth.email)

      if (await bcrypt.compare(auth.password, loginData.password)) {
        delete loginData['password']

        return this.newRefreshAndAccessToken(loginData, values)
      } else {
        throw new HttpException(await this.i18n.t('errors.wrong_credentials'), HttpStatus.FORBIDDEN)
      }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  private async newRefreshAndAccessToken(
    loginData: UserResponse,
    values: { userAgent: string; ipAddress: string },
  ): Promise<AuthResponse> {
    const authObject = new CreateAuthDto()
    authObject.user_uuid = loginData.user_uuid
    authObject.user_agent = values.userAgent
    authObject.ip_address = values.ipAddress

    const auth: Auth = await this.create(authObject)

    const authJson = {
      refreshToken: sign(auth, this.configService.get('refresh_secret')),
      accessToken: sign(
        {
          ...loginData,
        },
        this.configService.get('access_secret'),
        {
          expiresIn: '12h',
        },
      ),
    }

    return authJson
  }

  async refresh(refreshStr: string): Promise<string | undefined> {
    const refreshToken = await this.retrieveRefreshToken(refreshStr)
    if (!refreshToken) {
      throw new HttpException(await this.i18n.t('errors.invalid_jwt'), HttpStatus.FORBIDDEN)
    }

    const user = await this.usersService.findByUuid(refreshToken.user_uuid, false)
    if (!user) {
      throw new HttpException(await this.i18n.t('errors.user_not_found'), HttpStatus.NOT_FOUND)
    }

    const loginData = await this.usersService.authByEmail(user.email)
    delete loginData['password']

    const accessToken = {
      ...loginData,
    }

    return sign(accessToken, this.configService.get('access_secret'), {
      expiresIn: '12h',
    })
  }

  private async retrieveRefreshToken(refreshStr: string): Promise<Auth | undefined> {
    try {
      const decoded = verify(refreshStr, this.configService.get('refresh_secret'))
      if (typeof decoded === 'string') {
        return undefined
      }

      const auth_uuid = decoded.auth_uuid
      return await this.authRepository.findOne({ where: { auth_uuid } })
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async logout(refreshStr): Promise<StatusAuthResponse> {
    const refreshToken = await this.retrieveRefreshToken(refreshStr)

    if (!refreshToken) {
      return { status: false }
    }

    const auth_uuid = refreshToken.auth_uuid

    const foundAuth = await this.authRepository
      .createQueryBuilder()
      .select('Auth.auth_uuid')
      .where('auth_uuid = :auth_uuid', { auth_uuid })
      .getOne()
    if (!foundAuth) {
      throw new HttpException(await this.i18n.t('errors.invalid_jwt'), HttpStatus.FORBIDDEN)
    } else {
      await this.authRepository
        .createQueryBuilder()
        .delete()
        .where('auth_uuid = :auth_uuid', { auth_uuid })
        .execute()

      return { status: true }
    }
  }
}
