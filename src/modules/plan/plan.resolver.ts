import { HttpException, HttpStatus, Inject, Req, UseGuards } from '@nestjs/common'
import { PlanService } from './plan.service'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { I18nService } from 'nestjs-i18n'
import { AppStrings } from 'src/common/constants/strings'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { ArrayPlanResponse, StatusPlanResponse } from './response'
import { CreatePlanDto, UpdatePlanDto } from './dto'
import { CacheRoutes } from 'src/common/constants/constants'
import { PlanFilter } from './filter'
import { UserService } from '../user/user.service'
import { PlanWayService } from '../plan-way/plan-way.service'
import { OrganizationService } from '../organization/organization.service'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Plan } from './entities/plan.entity'

@Resolver(() => Plan)
export class PlanResolver {
  constructor(
    private readonly planService: PlanService,
    private readonly userService: UserService,
    private readonly wayService: PlanWayService,
    private readonly organizationService: OrganizationService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Mutation(() => StatusPlanResponse, { name: 'create_plan', description: AppStrings.PLAN_CREATE_OPERATION })
  async create(@Args('plan') plan: CreatePlanDto) {
    const result = await this.planService.create(plan)
    await this.clearCache()
    return result
  }

  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Query(() => ArrayPlanResponse, { name: 'plans', description: AppStrings.PLAN_ALL_OPERATION })
  async findAll(@Args('filter') planFilter: PlanFilter) {
    const key = `${CacheRoutes.PLANS}/all-${JSON.stringify(planFilter)}`
    let result: ArrayPlanResponse = await this.cacheManager.get(key)

    if (result) {
      return result
    } else {
      result = await this.planService.findAll(planFilter)
      await this.cacheManager.set(key, result)
      return result
    }
  }

  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Mutation(() => StatusPlanResponse, { name: 'update_plan', description: AppStrings.PLAN_UPDATE_OPERATION })
  async update(@Args('plan') plan: UpdatePlanDto, @Req() request) {
    const isPlanExists = await this.planService.isExists(plan.plan_uuid)
    if (!isPlanExists) throw new HttpException(this.i18n.t('errors.plan_not_found'), HttpStatus.NOT_FOUND)

    if (plan.user_uuid) {
      const isUserExists = await this.userService.isExists({ user_uuid: plan.user_uuid })
      if (!isUserExists) throw new HttpException(this.i18n.t('errors.user_not_found'), HttpStatus.NOT_FOUND)
    }

    if (plan.way_id) {
      const isWayExists = await this.wayService.isExists(plan.way_id)
      if (!isWayExists) throw new HttpException(this.i18n.t('errors.user_not_found'), HttpStatus.NOT_FOUND)
    }

    if (plan.branch_uuid) {
      const isBranchExists = await this.organizationService.isExists(plan.branch_uuid)
      if (!isBranchExists) throw new HttpException(this.i18n.t('errors.organization_not_found'), HttpStatus.NOT_FOUND)
    }

    const result = await this.planService.update(plan, request.user.user_uuid)
    await this.clearCache()
    return result
  }

  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Mutation(() => StatusPlanResponse, { name: 'delete_plan', description: AppStrings.PLAN_DELETE_OPERATION })
  async delete(@Args('uuid') id: string) {
    const isExists = await this.planService.isExists(id)
    if (!isExists) {
      throw new HttpException(this.i18n.t('errors.plan_not_found'), HttpStatus.NOT_FOUND)
    }

    const result = await this.planService.delete(id)
    await this.clearCache()
    return result
  }

  async clearCache() {
    const keys = await this.cacheManager.store.keys(`${CacheRoutes.PLANS}*`) // Удаление кэша
    for (const key of keys) {
      await this.cacheManager.del(key)
    }
  }
}
