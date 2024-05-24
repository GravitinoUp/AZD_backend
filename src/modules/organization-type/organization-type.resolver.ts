import { Inject, UseGuards } from '@nestjs/common'
import { OrganizationTypeService } from './organization-type.service'
import { ApiBearerAuth } from '@nestjs/swagger'
import { CacheRoutes } from 'src/common/constants/constants'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { I18nService } from 'nestjs-i18n'
import { ArrayOrganizationTypeResponse } from './response'
import { OrganizationTypeFilter } from './filters'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { ActiveGuard } from '../auth/guards/active.guard'

@ApiBearerAuth()
@Resolver('organization_type')
export class OrganizationTypeResolver {
  constructor(
    private readonly organizationTypeService: OrganizationTypeService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Query(() => ArrayOrganizationTypeResponse, { name: 'organization_types' })
  async findAll(@Args('filter') typeFilter: OrganizationTypeFilter) {
    const key = `${CacheRoutes.ORGANIZATION_TYPES}/all-${JSON.stringify(typeFilter)}`
    let types: ArrayOrganizationTypeResponse = await this.cacheManager.get(key)

    if (types) {
      return types
    } else {
      types = await this.organizationTypeService.findAll(typeFilter)
      await this.cacheManager.set(key, types)
      return types
    }
  }
}
