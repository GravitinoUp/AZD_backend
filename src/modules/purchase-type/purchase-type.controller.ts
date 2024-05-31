import { Body, Controller, Inject, Post, UseFilters } from '@nestjs/common'
import { PurchaseTypeService } from './purchase-type.service'
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { I18nService } from 'nestjs-i18n'
import { CacheRoutes } from 'src/common/constants/constants'
import { AppStrings } from 'src/common/constants/strings'
import { PurchaseTypeFilter } from './filter'
import { ArrayPurchaseTypeResponse } from './response'

@ApiBearerAuth()
@ApiTags('Purchase Types')
@Controller('purchase-type')
@UseFilters(AllExceptionsFilter)
export class PurchaseTypeController {
  constructor(
    private readonly purchaseTypeService: PurchaseTypeService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @ApiOperation({ summary: AppStrings.PURCHASE_TYPE_ALL_OPERATION })
  @ApiOkResponse({
    description: AppStrings.PURCHASE_TYPE_ALL_RESPONSE,
    type: ArrayPurchaseTypeResponse,
  })
  @ApiBody({ required: false, type: PurchaseTypeFilter })
  @Post('all')
  async findAll(@Body() typeFilter: PurchaseTypeFilter) {
    const key = `${CacheRoutes.PURCHASE_TYPE}/all-${JSON.stringify(typeFilter)}`
    let types: ArrayPurchaseTypeResponse = await this.cacheManager.get(key)

    if (types) {
      return types
    } else {
      types = await this.purchaseTypeService.findAll(typeFilter)
      await this.cacheManager.set(key, types)
      return types
    }
  }
}
