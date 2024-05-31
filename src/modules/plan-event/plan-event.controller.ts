import { Body, Controller, HttpStatus, Inject, Post, UseFilters, UseGuards } from '@nestjs/common'
import { PlanEventService } from './plan-event.service'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { AppStrings } from 'src/common/constants/strings'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { ArrayPlanEventResponse } from './response'
import { CacheRoutes } from 'src/common/constants/constants'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { I18nService } from 'nestjs-i18n'
import { PlanEventFilter } from './filters'

@ApiBearerAuth()
@ApiTags('Plan Events')
@Controller('plan-event')
@UseFilters(AllExceptionsFilter)
export class PlanEventController {
  constructor(
    private readonly planEventService: PlanEventService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @ApiOperation({ summary: AppStrings.PLAN_EVENT_ALL_OPERATION })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AppStrings.PLAN_EVENT_ALL_RESPONSE,
    type: ArrayPlanEventResponse,
  })
  @ApiBody({ required: false, type: PlanEventFilter })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Post('all')
  async findAll(@Body() filter: PlanEventFilter) {
    const key = `${CacheRoutes.PLAN_EVENT}/all-${JSON.stringify(filter)}`
    let planEvents: ArrayPlanEventResponse = await this.cacheManager.get(key)

    if (planEvents) {
      return planEvents
    } else {
      planEvents = await this.planEventService.findAll(filter)
      await this.cacheManager.set(key, planEvents)
      return planEvents
    }
  }
}
