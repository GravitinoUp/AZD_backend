import { Body, HttpStatus, HttpException, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto, UpdateCurrentUserDto, UpdateUserPasswordDto } from './dto'
import { I18nService } from 'nestjs-i18n'
import { StatusUserResponse, UserResponse } from './response'
import { AppStrings } from 'src/common/constants/strings'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { Context, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver('users')
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly i18n: I18nService,
  ) {}

  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Mutation(() => StatusUserResponse, { name: 'create_user', description: AppStrings.USERS_CREATE_OPERATION })
  async create(@Body() createUserDto: CreateUserDto) {
    const isUserExists = await this.userService.isExists({
      phone: createUserDto.phone,
      email: createUserDto.email,
    })

    if (isUserExists) {
      throw new HttpException(await this.i18n.t('errors.user_exists'), HttpStatus.CONFLICT)
    }

    const result = await this.userService.create(createUserDto)
    return result
  }

  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Query(() => UserResponse, { name: 'my_user', description: AppStrings.USERS_GET_CURRENT_OPERATION })
  async getCurrent(@Context() context) {
    const result = await this.userService.findByUuid(context.req.user.user_uuid)

    return result
  }

  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Mutation(() => StatusUserResponse, {
    name: 'update_my_user',
    description: AppStrings.USERS_UPDATE_CURRENT_OPERATION,
  })
  async updateCurrent(@Body() user: UpdateCurrentUserDto, @Context() context) {
    const isUserExists = await this.userService.isExists({ user_uuid: context.req.user.user_uuid })
    if (!isUserExists) {
      throw new HttpException(await this.i18n.t('errors.user_not_found'), HttpStatus.NOT_FOUND)
    }

    const result = await this.userService.update(user, context.req.user.user_uuid)
    return result
  }

  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Mutation(() => StatusUserResponse, {
    name: 'update_my_user_password',
    description: AppStrings.USERS_UPDATE_PASSWORD_OPERATION,
  })
  async updatePassword(@Body() updateUserPasswordDto: UpdateUserPasswordDto, @Context() context) {
    const result = await this.userService.updatePassword(updateUserPasswordDto, context.req.user.user_uuid)
    return result
  }
}
