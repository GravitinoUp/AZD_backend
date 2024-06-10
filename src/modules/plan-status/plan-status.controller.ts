import { Body, Controller, Get, Inject, Post, UseFilters } from '@nestjs/common'
import { PlanStatusService } from './plan-status.service'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { I18nService } from 'nestjs-i18n'
import { CacheRoutes } from 'src/common/constants/constants'
import { AppStrings } from 'src/common/constants/strings'
import { ArrayPlanStatusResponse } from './response'
import { PlanStatusFilter } from './filter'

@ApiBearerAuth()
@ApiTags('Plan Status')
@Controller('plan-status')
@UseFilters(AllExceptionsFilter)
export class PlanStatusController {
  constructor(
    private readonly planStatusService: PlanStatusService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @ApiOperation({ summary: AppStrings.PLAN_STATUS_ALL_OPERATION })
  @ApiOkResponse({
    description: AppStrings.PLAN_STATUS_ALL_RESPONSE,
    type: ArrayPlanStatusResponse,
  })
  @Get('all')
  async getAll() {
    const key = `${CacheRoutes.PLAN_STATUS}/all-{}`
    let result: ArrayPlanStatusResponse = await this.cacheManager.get(key)

    if (result) {
      return result
    } else {
      result = await this.planStatusService.findAll({})
      await this.cacheManager.set(key, result)
      return result
    }
  }

  @ApiOperation({ summary: AppStrings.PLAN_STATUS_ALL_OPERATION })
  @ApiOkResponse({
    description: AppStrings.PLAN_STATUS_ALL_RESPONSE,
    type: ArrayPlanStatusResponse,
  })
  @Post('all')
  async findAll(@Body() wayFilter: PlanStatusFilter) {
    const key = `${CacheRoutes.PLAN_STATUS}/all-${JSON.stringify(wayFilter)}`
    let result: ArrayPlanStatusResponse = await this.cacheManager.get(key)

    if (result) {
      return result
    } else {
      result = await this.planStatusService.findAll(wayFilter)
      await this.cacheManager.set(key, result)
      return result
    }
  }
}
