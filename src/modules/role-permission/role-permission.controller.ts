import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common'
import { RolePermissionService } from './role-permission.service'
import { ApiOperation, ApiCreatedResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { CacheRoutes } from 'src/common/constants/constants'
import { AppStrings } from 'src/common/constants/strings'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import {
  ArrayRolePermissionResponse,
  RolePermissionResponse,
  StatusRolePermissionResponse,
} from './response'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { CreateRolesPermissionDto, UpdateRolePermissionDto } from './dto'
import { I18nService } from 'nestjs-i18n'
import { RoleService } from '../role/role.service'
import { UserService } from '../user/user.service'
import { PermissionService } from '../permission/permission.service'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { PermissionsGuard } from './guards/permission.guard'

@ApiBearerAuth()
@ApiTags('Permissions')
@Controller('role-permission')
@UseFilters(AllExceptionsFilter)
export class RolePermissionController {
  constructor(
    private readonly rolePermissionService: RolePermissionService,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly permissionService: PermissionService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.RolePermissionCreate])
  @ApiOperation({ summary: AppStrings.ROLE_PERMISSIONS_CREATE_OPERATION })
  @ApiCreatedResponse({
    description: AppStrings.ROLE_PERMISSIONS_CREATED_RESPONSE,
    type: StatusRolePermissionResponse,
  })
  @Post('create')
  async create(@Body() rolePermission: CreateRolesPermissionDto) {
    if (!rolePermission.role_id && !rolePermission.user_uuid) {
      throw new HttpException(this.i18n.t('errors.role_or_user_null'), HttpStatus.BAD_REQUEST)
    }

    if (rolePermission.role_id) {
      const isRoleExists = await this.roleService.isExists(rolePermission.role_id)
      if (!isRoleExists) {
        throw new NotFoundException(this.i18n.t('errors.role_not_found'))
      }
    }

    if (rolePermission.user_uuid) {
      const isUserExists = await this.userService.isExists({
        user_uuid: rolePermission.user_uuid,
      })
      if (!isUserExists) {
        throw new HttpException(this.i18n.t('errors.user_not_found'), HttpStatus.NOT_FOUND)
      }
    }

    for (const id of rolePermission.permission_ids) {
      const isPermissionExists = await this.permissionService.isExists(id)
      if (!isPermissionExists) {
        throw new HttpException(
          `${this.i18n.t('errors.permission_not_found')} (ID: ${id})`,
          HttpStatus.NOT_FOUND,
        )
      }
    }

    const result = await this.rolePermissionService.create(rolePermission)
    await this.clearCache()
    return result
  }

  @UseGuards(JwtAuthGuard, ActiveGuard)
  @ApiOperation({ summary: AppStrings.ROLE_PERMISSION_ALL_OPERATION })
  @ApiCreatedResponse({
    description: AppStrings.ROLE_PERMISSION_ALL_RESPONSE,
    type: ArrayRolePermissionResponse,
    isArray: true,
  })
  @Get('all')
  async findAll() {
    const key = `${CacheRoutes.ROLE_PERMISSION}/all`
    let rolesPermissions: ArrayRolePermissionResponse = await this.cacheManager.get(key)

    if (rolesPermissions) {
      return rolesPermissions
    } else {
      rolesPermissions = await this.rolePermissionService.findAll()
      await this.cacheManager.set(key, rolesPermissions)
      return rolesPermissions
    }
  }

  @UseGuards(JwtAuthGuard, ActiveGuard)
  @ApiOperation({ summary: AppStrings.ROLE_PERMISSION_MY_OPERATION })
  @ApiCreatedResponse({
    description: AppStrings.ROLE_PERMISSION_MY_RESPONSE,
    type: RolePermissionResponse,
    isArray: true,
  })
  @Get('my')
  async findMy(@Req() request) {
    const key = `${CacheRoutes.ROLE_PERMISSION}/my-${request.user.user_uuid}`
    let rolesPermissions: ArrayRolePermissionResponse = await this.cacheManager.get(key)

    if (rolesPermissions) {
      return rolesPermissions
    } else {
      rolesPermissions = await this.rolePermissionService.findMy(request.user.user_uuid)
      await this.cacheManager.set(key, rolesPermissions)
      return rolesPermissions
    }
  }

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.RolePermissionUpdate])
  @ApiOperation({ summary: AppStrings.ROLE_PERMISSION_UPDATE_OPERATION })
  @ApiCreatedResponse({
    description: AppStrings.ROLE_PERMISSION_UPDATE_RESPONSE,
    type: StatusRolePermissionResponse,
  })
  @Patch()
  async update(@Body() updateRolesPermissionDto: UpdateRolePermissionDto) {
    const isRolePermissionExists = await this.rolePermissionService.isExists(
      updateRolesPermissionDto.role_permission_uuid,
    )

    if (!isRolePermissionExists) {
      throw new HttpException(this.i18n.t('errors.role_permission_not_found'), HttpStatus.NOT_FOUND)
    }

    const result = await this.rolePermissionService.update(updateRolesPermissionDto)
    await this.clearCache()
    return result
  }

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.RolePermissionDelete])
  @ApiOperation({ summary: AppStrings.ROLE_PERMISSION_DELETE_OPERATION })
  @ApiCreatedResponse({
    description: AppStrings.ROLE_PERMISSION_DELETE_RESPONSE,
    type: StatusRolePermissionResponse,
  })
  @Delete(':uuid')
  async remove(@Param('uuid') id: string) {
    const isRolePermissionExists = await this.rolePermissionService.isExists(id)

    if (!isRolePermissionExists) {
      throw new HttpException(this.i18n.t('errors.role_permission_not_found'), HttpStatus.NOT_FOUND)
    }
    const result = await this.rolePermissionService.delete(id)
    await this.clearCache()
    return result
  }

  async clearCache() {
    const keys = await this.cacheManager.store.keys(`${CacheRoutes.ROLE_PERMISSION}*`) // Удаление кэша
    for (const key of keys) {
      await this.cacheManager.del(key)
    }
  }
}
