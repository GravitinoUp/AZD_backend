import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { ArrayUserResponse, StatusUserResponse, UserResponse } from './response'
import { CreateUserDto, UpdateCurrentUserDto, UpdateUserPasswordDto } from './dto'
import { CreatePersonDto } from '../person/dto'
import { Person } from '../person/entities/person.entity'
import * as bcrypt from 'bcrypt'
import { I18nService } from 'nestjs-i18n'
import { DefaultPagination } from 'src/common/constants/constants'
import { UserFilter } from './filters'
import { formatFilter } from 'src/utils/format-filter'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly i18n: I18nService,
    private dataSource: DataSource,
  ) {}

  async create(user: CreateUserDto): Promise<StatusUserResponse> {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      const person = new CreatePersonDto()
      person.last_name = user.last_name
      person.first_name = user.first_name
      person.patronymic = user.patronymic
      person.post = user.post
      person.legal_basis_uuid = user.legal_basis_uuid

      const newPerson = await queryRunner.manager.insert(Person, person)
      const personUuid = newPerson.identifiers[0].person_uuid

      user.password = await bcrypt.hash(user.password.toString(), 10)
      const newUser = await queryRunner.manager
        .getRepository(User)
        .createQueryBuilder()
        .useTransaction(true)
        .insert()
        .values({
          user_uuid: personUuid,
          ...user,
          person_uuid: personUuid,
        })
        .returning('*')
        .execute()

      const result = newUser.raw[0]
      if (result) {
        await queryRunner.commitTransaction()
        return { status: true, data: result }
      } else {
        await queryRunner.rollbackTransaction()
        return { status: false }
      }
    } catch (error) {
      console.log(error)
      await queryRunner.rollbackTransaction()
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    } finally {
      await queryRunner.release()
    }
  }

  async findByUuid(user_uuid: string, includeJoins: boolean = true): Promise<UserResponse> {
    try {
      let query = this.usersRepository.createQueryBuilder('user').select()
      if (includeJoins) {
        query = query.leftJoinAndSelect('user.role', 'role').leftJoinAndSelect('user.person', 'person')
      }
      query = query.where({ user_uuid })

      const user = await query.getOne()

      return user
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll(userFilter: UserFilter): Promise<ArrayUserResponse> {
    try {
      const count = userFilter?.offset?.count ?? DefaultPagination.COUNT
      const page = userFilter?.offset?.page ?? DefaultPagination.PAGE
      const filters = formatFilter(userFilter?.filter ?? {})

      const users = await this.usersRepository.findAndCount({
        relations: { role: true, person: true },
        where: filters,
        order: userFilter.sorts,
        skip: count * (page - 1),
        take: count,
      })

      return { count: users[1], data: users[0] }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async isExists({
    phone,
    email,
    user_uuid,
  }: {
    phone?: string
    email?: string
    user_uuid?: string
  }): Promise<boolean> {
    try {
      const isUserExists = await this.usersRepository
        .createQueryBuilder()
        .select(['User.user_uuid', 'User.email', 'User.phone'])
        .where('User.phone = :phone', { phone })
        .orWhere('User.email = :email', { email })
        .orWhere('User.user_uuid = :user_uuid', { user_uuid })
        .getExists()

      return isUserExists
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async authByEmail(email: string): Promise<UserResponse> {
    try {
      const user = await this.usersRepository
        .createQueryBuilder()
        .select(['User.user_uuid', 'User.email', 'User.phone', 'User.is_active', 'User.password'])
        .where('User.email = :email', { email })
        .getOne()

      return user
    } catch (error) {
      console.log(error)

      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async canUserActivate(user_uuid: string): Promise<boolean> {
    try {
      const user = await this.findByUuid(user_uuid, false)

      if (user.is_active) {
        return true
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? 500)
    }
  }

  async update(user: UpdateCurrentUserDto, user_uuid: string): Promise<StatusUserResponse> {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      const updatePerson = await queryRunner.manager
        .getRepository(Person)
        .createQueryBuilder()
        .useTransaction(true)
        .update()
        .set({ ...user })
        .where({ person_uuid: user_uuid })
        .execute()

      if (updatePerson.affected != 0) {
        await queryRunner.commitTransaction()
        return { status: true }
      } else {
        await queryRunner.rollbackTransaction()
        return { status: false }
      }
    } catch (error) {
      console.log(error)
      await queryRunner.rollbackTransaction()
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    } finally {
      await queryRunner.release()
    }
  }

  async updatePassword(updateUserPasswordDto: UpdateUserPasswordDto, user_uuid: string): Promise<StatusUserResponse> {
    try {
      const user = await this.usersRepository
        .createQueryBuilder('user')
        .select(['user.password'])
        .where({ user_uuid })
        .getOne()

      if (await bcrypt.compare(updateUserPasswordDto.old_password, user.password)) {
        const newPassword = await bcrypt.hash(updateUserPasswordDto.password.toString(), 10)
        const updateUserPassword = await this.usersRepository
          .createQueryBuilder()
          .update()
          .set({ password: newPassword })
          .where({ user_uuid })
          .execute()

        if (updateUserPassword.affected > 0) {
          return { status: true }
        } else {
          return { status: false }
        }
      } else {
        throw new HttpException(await this.i18n.t('errors.password_mismatch'), HttpStatus.BAD_REQUEST)
      }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  // async resetPassword(resetUserPasswordDto: ResetUserPasswordDto): Promise<StatusUserResponse> {
  //   try {
  //     const code = await this.authCodeService.findCode(resetUserPasswordDto.code)

  //     console.log(code)

  //     if (code) {
  //       const user = await this.usersRepository
  //         .createQueryBuilder('user')
  //         .select(['user.user_uuid', 'user.phone'])
  //         .where('user.phone = :phone OR user.email = :email', {
  //           phone: code.phone,
  //           email: code.email,
  //         })
  //         .getOne()

  //       const newPassword = await bcrypt.hash(resetUserPasswordDto.password.toString(), 10)
  //       const updateUserPassword = await this.usersRepository
  //         .createQueryBuilder()
  //         .update()
  //         .set({ password: newPassword })
  //         .where('user_uuid = :user_uuid', { user_uuid: user.user_uuid })
  //         .execute()

  //       if (updateUserPassword.affected > 0) {
  //         return { status: true }
  //       } else {
  //         return { status: false }
  //       }
  //     } else {
  //       throw new HttpException(await this.i18n.t('errors.invalid_code'), HttpStatus.BAD_REQUEST)
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
  //   }
  // }

  async delete(user_uuid: string): Promise<StatusUserResponse> {
    try {
      const deleteUser = await this.usersRepository
        .createQueryBuilder()
        .update()
        .set({ is_active: false })
        .where({ user_uuid })
        .execute()

      if (deleteUser.affected != 0) {
        return { status: true }
      } else {
        return { status: false }
      }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
