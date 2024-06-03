import { Body, Controller, HttpStatus, Inject, Post, UseFilters, UseGuards } from '@nestjs/common'
import { PurchaseEventService } from './purchase-event.service'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { I18nService } from 'nestjs-i18n'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { CacheRoutes } from 'src/common/constants/constants'
import { AppStrings } from 'src/common/constants/strings'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { PurchaseEventFilter } from './filters'
import { ArrayPurchaseEventResponse } from './response'

@ApiBearerAuth()
@ApiTags('Purchase Events')
@Controller('purchase-event')
@UseFilters(AllExceptionsFilter)
export class PurchaseEventController {
  constructor(
    private readonly purchaseEventService: PurchaseEventService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @ApiOperation({ summary: AppStrings.PURCHASE_EVENT_ALL_OPERATION })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AppStrings.PURCHASE_EVENT_ALL_RESPONSE,
    type: ArrayPurchaseEventResponse,
  })
  @ApiBody({ required: false, type: PurchaseEventFilter })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Post('all')
  async findAll(@Body() filter: PurchaseEventFilter) {
    const key = `${CacheRoutes.PURCHASE_EVENT}/all-${JSON.stringify(filter)}`
    let purchaseEvents: ArrayPurchaseEventResponse = await this.cacheManager.get(key)

    if (purchaseEvents) {
      return purchaseEvents
    } else {
      purchaseEvents = await this.purchaseEventService.findAll(filter)
      await this.cacheManager.set(key, purchaseEvents)
      return purchaseEvents
    }
  }
}
