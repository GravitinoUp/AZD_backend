import { Body, Controller, Get, Inject, Post, UseFilters } from '@nestjs/common'
import { PlanWayService } from './plan-way.service'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { I18nService } from 'nestjs-i18n'
import { ArrayWayResponse } from './response'
import { CacheRoutes } from 'src/common/constants/constants'
import { AppStrings } from 'src/common/constants/strings'
import { PlanWayFilter } from './filter'

@ApiBearerAuth()
@ApiTags('Plan Ways')
@Controller('plan-way')
@UseFilters(AllExceptionsFilter)
export class PlanWayController {
  constructor(
    private readonly planWayService: PlanWayService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @ApiOperation({ summary: AppStrings.PLAN_WAY_ALL_OPERATION })
  @ApiOkResponse({
    description: AppStrings.PLAN_WAY_ALL_RESPONSE,
    type: ArrayWayResponse,
  })
  @Get('all')
  async getAll() {
    const key = `${CacheRoutes.PLAN_WAY}/all-{}`
    let result: ArrayWayResponse = await this.cacheManager.get(key)

    if (result) {
      return result
    } else {
      result = await this.planWayService.findAll({})
      await this.cacheManager.set(key, result)
      return result
    }
  }

  @ApiOperation({ summary: AppStrings.PLAN_WAY_ALL_OPERATION })
  @ApiOkResponse({
    description: AppStrings.PLAN_WAY_ALL_RESPONSE,
    type: ArrayWayResponse,
  })
  @Post('all')
  async findAll(@Body() wayFilter: PlanWayFilter) {
    const key = `${CacheRoutes.PLAN_WAY}/all-${JSON.stringify(wayFilter)}`
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
