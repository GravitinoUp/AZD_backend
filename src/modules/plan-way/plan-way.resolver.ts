import { Inject, UseGuards } from '@nestjs/common'
import { PlanWayService } from './plan-way.service'
import { ApiBearerAuth } from '@nestjs/swagger'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { I18nService } from 'nestjs-i18n'
import { ArrayWayResponse } from './response'
import { CacheRoutes } from 'src/common/constants/constants'
import { AppStrings } from 'src/common/constants/strings'
import { PlanWayFilter } from './filter'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { ActiveGuard } from '../auth/guards/active.guard'

@ApiBearerAuth()
@Resolver('plan-way')
export class PlanWayResolver {
  constructor(
    private readonly planWayService: PlanWayService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Query(() => ArrayWayResponse, { name: 'plan_ways', description: AppStrings.PLAN_WAY_ALL_OPERATION })
  async findAll(@Args('filter') wayFilter: PlanWayFilter) {
    const key = `${CacheRoutes.PLAN_WAYS}/all-${JSON.stringify(wayFilter)}`
    let result: ArrayWayResponse = await this.cacheManager.get(key)

    if (result) {
      return result
    } else {
      result = await this.planWayService.findAll(wayFilter)
      await this.cacheManager.set(key, result)
      return result
    }
  }
}
