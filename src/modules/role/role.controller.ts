import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  NotFoundException,
  Patch,
  Post,
  Query,
  UseFilters,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { RoleService } from './role.service'
import { I18nContext, I18nService } from 'nestjs-i18n'
import { AppStrings } from 'src/common/constants/strings'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { CreateRoleDto, UpdateRoleDto } from './dto'
import { ArrayRoleResponse, StatusRoleResponse } from './response'
import { RoleFilter } from './filters'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { CacheRoutes } from 'src/common/constants/constants'
import { PermissionsGuard } from '../role-permission/guards/permission.guard'
import { PermissionService } from '../permission/permission.service'
import { RolePermissionService } from '../role-permission/role-permission.service'

@ApiBearerAuth()
@ApiTags('Roles')
@Controller('roles')
@UseFilters(AllExceptionsFilter)
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly permissionService: PermissionService,
    private readonly rolePermissionService: RolePermissionService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.RoleCreate])
  @ApiOperation({ summary: AppStrings.ROLE_CREATE_OPERATION })
  @ApiCreatedResponse({
    description: AppStrings.ROLE_CREATE_RESPONSE,
    type: StatusRoleResponse,
  })
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    for (const id of createRoleDto.permission_ids) {
      const isPermissionExists = await this.permissionService.isExists(id)
      if (!isPermissionExists) {
        throw new HttpException(
          `${this.i18n.t('errors.permission_not_found', { lang: I18nContext.current().lang })} (ID: ${id})`,
          HttpStatus.NOT_FOUND,
        )
      }
    }

    const result = await this.roleService.create(createRoleDto)
    await this.clearCache()
    return result
  }

  @UseGuards(JwtAuthGuard, ActiveGuard)
  @ApiOkResponse({
    description: AppStrings.ROLE_ALL_RESPONSE,
    type: ArrayRoleResponse,
  })
  @ApiBody({ required: false, type: RoleFilter })
  @ApiQuery({ required: false, type: Boolean, name: 'include_properties' })
  @Post('all')
  async findAll(
    @Body() roleFilter: RoleFilter,
    @Query('include_properties') includeProperties?: boolean,
  ) {
    const key = `${CacheRoutes.ROLE}/all-${JSON.stringify(roleFilter)}-${includeProperties}`
    let roles: ArrayRoleResponse = await this.cacheManager.get(key)

    if (roles) {
      return roles
    } else {
      roles = await this.roleService.findAll(roleFilter, includeProperties)
      await this.cacheManager.set(key, roles)
      return roles
    }
  }

  @ApiOperation({ summary: AppStrings.ROLE_ALL_OPERATION })
  @ApiOkResponse({
    description: AppStrings.ROLE_ALL_RESPONSE,
    type: ArrayRoleResponse,
  })
  @Get('all')
  async getAll() {
    const key = `${CacheRoutes.ROLE}/all-{}`
    let roles: ArrayRoleResponse = await this.cacheManager.get(key)

    if (roles) {
      return roles
    } else {
      roles = await this.roleService.findAll({})
      await this.cacheManager.set(key, roles)
      return roles
    }
  }

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.RoleUpdate])
  @ApiOperation({ summary: AppStrings.ROLE_UPDATE_OPERATION })
  @ApiOkResponse({
    description: AppStrings.ROLE_UPDATE_RESPONSE,
    type: StatusRoleResponse,
  })
  @Patch()
  async update(@Body() updateRoleDto: UpdateRoleDto) {
    const isExists = await this.roleService.isExists(updateRoleDto.role_id)
    if (!isExists) {
      throw new NotFoundException(
        this.i18n.t('errors.role_not_found', { lang: I18nContext.current().lang }),
      )
    }

    for (const id of updateRoleDto.permission_ids) {
      const isPermissionExists = await this.permissionService.isExists(id)
      if (!isPermissionExists) {
        throw new HttpException(
          `${this.i18n.t('errors.permission_not_found', { lang: I18nContext.current().lang })} (ID: ${id})`,
          HttpStatus.NOT_FOUND,
        )
      }
    }
    const result = await this.roleService.update(updateRoleDto)
    await this.clearCache()
    return result
  }

  async clearCache() {
    const keys = await this.cacheManager.store.keys(`${CacheRoutes.ROLE}*`) // Удаление кэша
    for (const key of keys) {
      await this.cacheManager.del(key)
    }
  }
}
