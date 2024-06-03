import { Body, Controller, Inject, Post, UseFilters } from '@nestjs/common'
import { PurchaseStepService } from './purchase-step.service'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { ApiBearerAuth, ApiTags, ApiOperation, ApiOkResponse, ApiBody } from '@nestjs/swagger'
import { I18nService } from 'nestjs-i18n'
import { CacheRoutes } from 'src/common/constants/constants'
import { AppStrings } from 'src/common/constants/strings'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { PurchaseStepFilter } from './filter'
import { ArrayPurchaseStepResponse } from './response'

@ApiBearerAuth()
@ApiTags('Purchase Steps')
@Controller('purchase-step')
@UseFilters(AllExceptionsFilter)
export class PurchaseStepController {
  constructor(
    private readonly purchaseStepService: PurchaseStepService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @ApiOperation({ summary: AppStrings.PURCHASE_STEP_ALL_OPERATION })
  @ApiOkResponse({
    description: AppStrings.PURCHASE_STEP_ALL_RESPONSE,
    type: ArrayPurchaseStepResponse,
  })
  @ApiBody({ required: false, type: PurchaseStepFilter })
  @Post('all')
  async findAll(@Body() typeFilter: PurchaseStepFilter) {
    const key = `${CacheRoutes.PURCHASE_STEP}/all-${JSON.stringify(typeFilter)}`
    let types: ArrayPurchaseStepResponse = await this.cacheManager.get(key)

    if (types) {
      return types
    } else {
      types = await this.purchaseStepService.findAll(typeFilter)
      await this.cacheManager.set(key, types)
      return types
    }
  }
}
