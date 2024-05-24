import { HttpException, HttpStatus } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserService } from '../user/user.service'
import { AuthDto } from './dto/auth.dto'
import { I18nService } from 'nestjs-i18n'
import { RefreshTokenDto } from './dto/refresh-token.dto'
import { Throttle } from '@nestjs/throttler'
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import { Auth } from './entities/auth.entity'
import { AuthResponse } from './response'
import { AppStrings } from 'src/common/constants/strings'

@Resolver(() => Auth)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly i18n: I18nService,
  ) {}

  @Throttle({ default: { limit: 1, ttl: 1000 } })
  @Mutation(() => AuthResponse, { name: 'login', description: AppStrings.AUTH_LOGIN_OPERATION })
  async login(@Args('auth') authDto: AuthDto, @Context() context) {
    const user = await this.userService.authByEmail(authDto.email)
    if (!user) {
      throw new HttpException(await this.i18n.t('errors.user_not_found'), HttpStatus.NOT_FOUND)
    } else if (!user.is_active) {
      throw new HttpException(await this.i18n.t('errors.user_deactivated'), HttpStatus.FORBIDDEN)
    }

    return this.authService.login(authDto, {
      userAgent: context.req.headers['user-agent'],
      ipAddress: context.req.ip,
    })
  }

  @Throttle({ default: { limit: 1, ttl: 1000 } })
  @Mutation(() => String, { name: 'refresh' })
  async refreshToken(@Args('data') body: RefreshTokenDto) {
    return this.authService.refresh(body.refresh_token)
  }

  @Throttle({ default: { limit: 1, ttl: 1000 } })
  @Mutation(() => String, { name: 'logout', description: AppStrings.AUTH_LOGOUT_OPERATION })
  async logout(@Args('data') body: RefreshTokenDto) {
    return this.authService.logout(body.refresh_token)
  }
}
