import { Body, Controller, HttpStatus, Inject, Post, UseFilters, UseGuards } from '@nestjs/common'
import { LimitEventService } from './limit-event.service'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { ApiOperation, ApiResponse, ApiBody, ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { I18nService } from 'nestjs-i18n'
import { CacheRoutes } from 'src/common/constants/constants'
import { AppStrings } from 'src/common/constants/strings'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { LimitEventFilter } from './filters'
import { ArrayLimitEventResponse } from './response'
import { AllExceptionsFilter } from 'src/common/exception.filter'

@ApiBearerAuth()
@ApiTags('Limit Events')
@Controller('limit-event')
@UseFilters(AllExceptionsFilter)
export class LimitEventController {
  constructor(
    private readonly limitEventService: LimitEventService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @ApiOperation({ summary: AppStrings.LIMIT_EVENT_ALL_OPERATION })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AppStrings.LIMIT_EVENT_ALL_RESPONSE,
    type: ArrayLimitEventResponse,
  })
  @ApiBody({ required: false, type: LimitEventFilter })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Post('all')
  async findAll(@Body() filter: LimitEventFilter) {
    const key = `${CacheRoutes.LIMIT_EVENT}/all-${JSON.stringify(filter)}`
    let limitEvents: ArrayLimitEventResponse = await this.cacheManager.get(key)

    if (limitEvents) {
      return limitEvents
    } else {
      limitEvents = await this.limitEventService.findAll(filter)
      await this.cacheManager.set(key, limitEvents)
      return limitEvents
    }
  }
}
