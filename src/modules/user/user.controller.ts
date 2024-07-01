import {
  Controller,
  Post,
  Body,
  UseFilters,
  HttpStatus,
  HttpException,
  Req,
  Get,
  UseGuards,
  Patch,
  Inject,
  Query,
} from '@nestjs/common'
import { UserService } from './user.service'
import {
  CreateUserDto,
  RegisterUserDto,
  UpdateUserDto,
  UpdateUserPasswordDto,
  UpdateUserStatusDto,
} from './dto'
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { I18nContext, I18nService } from 'nestjs-i18n'
import { ArrayUserResponse, StatusUserResponse } from './response'
import { AppStrings } from 'src/common/constants/strings'
import { User } from './entities/user.entity'
import { Throttle } from '@nestjs/throttler'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { UserFilter } from './filters'
import { CacheRoutes, RolesEnum } from 'src/common/constants/constants'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
@UseFilters(AllExceptionsFilter)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @ApiOperation({ summary: AppStrings.USERS_CREATE_OPERATION })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AppStrings.USERS_CREATE_RESPONSE,
    type: StatusUserResponse,
  })
  @Throttle({ default: { limit: 1, ttl: 1000 } })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const isUserExists = await this.userService.isExists({
      phone: createUserDto.phone,
      email: createUserDto.email,
    })

    if (isUserExists) {
      throw new HttpException(
        await this.i18n.t('errors.user_exists', { lang: I18nContext.current().lang }),
        HttpStatus.CONFLICT,
      )
    }

    const result = await this.userService.create(createUserDto)
    await this.clearCache()
    return result
  }

  @ApiOperation({ summary: AppStrings.USERS_REGISTER_OPERATION })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AppStrings.USERS_REGISTER_RESPONSE,
    type: StatusUserResponse,
  })
  @Throttle({ default: { limit: 1, ttl: 1000 } })
  @Post('register')
  async register(@Body() user: RegisterUserDto) {
    const isUserExists = await this.userService.isExists({
      phone: user.phone,
      email: user.email,
    })

    if (isUserExists) {
      throw new HttpException(
        await this.i18n.t('errors.user_exists', { lang: I18nContext.current().lang }),
        HttpStatus.CONFLICT,
      )
    }

    const createUserDto: CreateUserDto = { ...user, role_id: RolesEnum.USER }

    const result = await this.userService.create(createUserDto)
    await this.clearCache()
    return result
  }

  @ApiOperation({ summary: AppStrings.USERS_ALL_OPERATION })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AppStrings.USERS_ALL_RESPONSE,
    type: ArrayUserResponse,
  })
  @ApiBody({ required: false, type: UserFilter })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @ApiQuery({ required: false, type: Boolean, name: 'include_properties' })
  @Post('all')
  async findAll(
    @Body() filter: UserFilter,
    @Query('include_properties') includeProperties?: boolean,
  ) {
    const key = `${CacheRoutes.USER}/all-${JSON.stringify(filter)}`
    let users: ArrayUserResponse = await this.cacheManager.get(key)

    if (users) {
      return users
    } else {
      users = await this.userService.findAll(filter, includeProperties)
      await this.cacheManager.set(key, users)
      return users
    }
  }

  @ApiOperation({ summary: AppStrings.USERS_GET_CURRENT_OPERATION })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AppStrings.USERS_GET_CURRENT_RESPONSE,
    type: User,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('my')
  async getCurrent(@Req() request) {
    const result = await this.userService.findByUuid(request.user.user_uuid)

    return result
  }

  @ApiOperation({ summary: AppStrings.USERS_UPDATE_CURRENT_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.USERS_UPDATE_CURRENT_RESPONSE,
    type: StatusUserResponse,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Patch()
  async update(@Body() user: UpdateUserDto) {
    const isUserExists = await this.userService.isExists({ user_uuid: user.user_uuid })
    if (!isUserExists) {
      throw new HttpException(
        await this.i18n.t('errors.user_not_found', { lang: I18nContext.current().lang }),
        HttpStatus.NOT_FOUND,
      )
    }

    const result = await this.userService.update(user)
    await this.clearCache()
    return result
  }

  @ApiOperation({ summary: AppStrings.USERS_UPDATE_STATUS_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.USERS_UPDATE_STATUS_RESPONSE,
    type: StatusUserResponse,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Patch('status')
  async updateStatus(@Body() updateUserStatusDto: UpdateUserStatusDto, @Req() request) {
    if (request.user.user_uuid == updateUserStatusDto.user_uuid) {
      throw new HttpException(
        await this.i18n.t('errors.self_status_change', { lang: I18nContext.current().lang }),
        HttpStatus.NOT_FOUND,
      )
    }
    const result = await this.userService.updateStatus(updateUserStatusDto)
    await this.clearCache()
    return result
  }

  @ApiOperation({ summary: AppStrings.USERS_UPDATE_PASSWORD_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.USERS_UPDATE_PASSWORD_RESPONSE,
    type: StatusUserResponse,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Patch('password')
  async updatePassword(@Body() updateUserPasswordDto: UpdateUserPasswordDto, @Req() request) {
    const result = await this.userService.updatePassword(
      updateUserPasswordDto,
      request.user.user_uuid,
    )
    await this.clearCache()
    return result
  }

  // @ApiOperation({ summary: AppStrings.USERS_RESET_PASSWORD_OPERATION })
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: AppStrings.USERS_RESET_PASSWORD_RESPONSE,
  //   type: StatusUserResponse,
  // })
  // @Throttle({ default: { limit: 1, ttl: 30000 } })
  // @Patch('password/reset')
  // async resetPassword(@Body() resetUserPasswordDto: ResetUserPasswordDto) {
  //   const result = await this.userService.resetPassword(resetUserPasswordDto)
  //   return result
  // }

  async clearCache() {
    const keys = await this.cacheManager.store.keys(`${CacheRoutes.USER}*`) // Удаление кэша
    for (const key of keys) {
      await this.cacheManager.del(key)
    }
  }
}
