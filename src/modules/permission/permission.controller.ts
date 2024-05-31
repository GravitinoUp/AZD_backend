import { Controller, Get, Inject, UseFilters } from '@nestjs/common'
import { PermissionService } from './permission.service'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { ApiOperation, ApiOkResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { I18nService } from 'nestjs-i18n'
import { CacheRoutes } from 'src/common/constants/constants'
import { AppStrings } from 'src/common/constants/strings'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { ArrayPermissionResponse } from './response'

@ApiBearerAuth()
@ApiTags('Permissions')
@Controller('permission')
@UseFilters(AllExceptionsFilter)
export class PermissionController {
  constructor(
    private readonly permissionService: PermissionService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @ApiOperation({ summary: AppStrings.PERMISSION_ALL_OPERATION })
  @ApiOkResponse({
    description: AppStrings.PERMISSION_ALL_RESPONSE,
    type: ArrayPermissionResponse,
  })
  @Get('all')
  async getAll() {
    const key = `${CacheRoutes.PERMISSION}/all-{}`
    let permissions: ArrayPermissionResponse = await this.cacheManager.get(key)

    if (permissions) {
      return permissions
    } else {
      permissions = await this.permissionService.findAll()
      await this.cacheManager.set(key, permissions)
      return permissions
    }
  }

  async clearCache() {
    const keys = await this.cacheManager.store.keys(`${CacheRoutes.PERMISSION}*`) // Удаление кэша
    for (const key of keys) {
      await this.cacheManager.del(key)
    }

    const rolePermissionKeys = await this.cacheManager.store.keys(`${CacheRoutes.ROLE_PERMISSION}*`) // Удаление кэша RolePermissions
    for (const key of rolePermissionKeys) {
      await this.cacheManager.del(key)
    }
  }
}
