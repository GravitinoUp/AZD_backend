import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { Inject, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiBearerAuth } from '@nestjs/swagger'
import { I18nService } from 'nestjs-i18n'
import { RoleService } from './role.service'
import { CacheRoutes } from 'src/common/constants/constants'
import { ArrayRoleResponse, StatusRoleResponse } from './response'
import { RoleFilter } from './filters'
import { AppStrings } from 'src/common/constants/strings'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { CreateRoleDto } from './dto'

@ApiBearerAuth()
@Resolver('roles')
export class RolesResolver {
  constructor(
    private readonly roleService: RoleService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Mutation(() => StatusRoleResponse, {
    name: 'create_role',
    description: AppStrings.ROLE_CREATE_OPERATION,
  })
  async create(@Args('role') createRoleDto: CreateRoleDto) {
    const result = await this.roleService.create(createRoleDto)
    await this.clearCache()
    return result
  }

  @Query(() => ArrayRoleResponse, { name: 'roles', description: AppStrings.ROLE_ALL_OPERATION })
  async findAll(@Args('filter') filter: RoleFilter) {
    const key = `${CacheRoutes.ROLES}/all-${JSON.stringify(filter)}`
    let roles: ArrayRoleResponse = await this.cacheManager.get(key)

    if (roles) {
      return roles
    } else {
      roles = await this.roleService.findAll(filter)
      await this.cacheManager.set(key, roles)
      return roles
    }
  }

  async clearCache() {
    const keys = await this.cacheManager.store.keys(`${CacheRoutes.ROLES}*`) // Удаление кэша
    for (const key of keys) {
      await this.cacheManager.del(key)
    }
  }
}
