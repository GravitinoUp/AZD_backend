import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { Inject, NotFoundException, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { I18nService } from 'nestjs-i18n'
import { RoleService } from './role.service'
import { CacheRoutes } from 'src/common/constants/constants'
import { ArrayRoleResponse, StatusRoleResponse } from './response'
import { RoleFilter } from './filters'
import { AppStrings } from 'src/common/constants/strings'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { CreateRoleDto, UpdateRoleDto } from './dto'
import { Role } from './entities/role.entity'

@Resolver(() => Role)
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

  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Mutation(() => StatusRoleResponse, { name: 'update_role', description: AppStrings.ROLE_UPDATE_OPERATION })
  async update(@Args('role') updateRoleDto: UpdateRoleDto) {
    const isExists = await this.roleService.isExists(updateRoleDto.role_id)

    if (!isExists) {
      throw new NotFoundException(this.i18n.t('errors.role_not_found'))
    }

    const result = await this.roleService.update(updateRoleDto)
    await this.clearCache()
    return result
  }

  async clearCache() {
    const keys = await this.cacheManager.store.keys(`${CacheRoutes.ROLES}*`) // Удаление кэша
    for (const key of keys) {
      await this.cacheManager.del(key)
    }
  }
}
