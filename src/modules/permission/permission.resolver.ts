import { Inject } from '@nestjs/common'
import { PermissionService } from './permission.service'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { ApiBearerAuth } from '@nestjs/swagger'
import { I18nService } from 'nestjs-i18n'
import { CacheRoutes } from 'src/common/constants/constants'
import { AppStrings } from 'src/common/constants/strings'
import { ArrayPermissionResponse } from './response'
import { Query, Resolver } from '@nestjs/graphql'

@ApiBearerAuth()
@Resolver('permission')
export class PermissionResolver {
  constructor(
    private readonly permissionService: PermissionService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @Query(() => ArrayPermissionResponse, { name: 'permissions', description: AppStrings.PERMISSION_ALL_OPERATION })
  async getAll() {
    const key = `${CacheRoutes.PERMISSIONS}/all-{}`
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
    const keys = await this.cacheManager.store.keys(`${CacheRoutes.PERMISSIONS}*`) // Удаление кэша
    for (const key of keys) {
      await this.cacheManager.del(key)
    }

    const rolePermissionKeys = await this.cacheManager.store.keys(`${CacheRoutes.ROLES_PERMISSIONS}*`) // Удаление кэша RolePermissions
    for (const key of rolePermissionKeys) {
      await this.cacheManager.del(key)
    }
  }
}
