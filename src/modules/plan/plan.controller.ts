import { Body, Controller, Inject, Post, UseFilters, UseGuards } from '@nestjs/common'
import { PlanService } from './plan.service'
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { I18nService } from 'nestjs-i18n'
import { AppStrings } from 'src/common/constants/strings'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { ArrayPlanResponse, StatusPlanResponse } from './response'
import { CreatePlanDto } from './dto'
import { CacheRoutes } from 'src/common/constants/constants'
import { PlanFilter } from './filter'

@ApiBearerAuth()
@ApiTags('Plan')
@Controller('plan')
@UseFilters(AllExceptionsFilter)
export class PlanController {
  constructor(
    private readonly planService: PlanService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @UseGuards(JwtAuthGuard, ActiveGuard)
  @ApiOperation({ summary: AppStrings.PLAN_CREATE_OPERATION })
  @ApiCreatedResponse({
    description: AppStrings.PLAN_CREATE_RESPONSE,
    type: StatusPlanResponse,
  })
  @Post()
  async create(@Body() plan: CreatePlanDto) {
    const result = await this.planService.create(plan)
    await this.clearCache()
    return result
  }

  @ApiOperation({ summary: AppStrings.PLAN_ALL_OPERATION })
  @ApiOkResponse({
    description: AppStrings.PLAN_ALL_RESPONSE,
    type: ArrayPlanResponse,
  })
  @ApiBody({ required: false, type: PlanFilter })
  @Post('all')
  async findAll(@Body() planFilter: PlanFilter) {
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

  async clearCache() {
    const keys = await this.cacheManager.store.keys(`${CacheRoutes.PLANS}*`) // Удаление кэша
    for (const key of keys) {
      await this.cacheManager.del(key)
    }
  }
}
