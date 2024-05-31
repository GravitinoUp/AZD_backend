import { Body, Controller, Inject, Post, UseFilters } from '@nestjs/common'
import { CurrencyService } from './currency.service'
import { ArrayCurrencyResponse } from './response'
import { AppStrings } from 'src/common/constants/strings'
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { CacheRoutes } from 'src/common/constants/constants'
import { CurrencyFilter } from './filters'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { I18nService } from 'nestjs-i18n'
import { AllExceptionsFilter } from 'src/common/exception.filter'

@ApiBearerAuth()
@ApiTags('Currency')
@Controller('currency')
@UseFilters(AllExceptionsFilter)
export class CurrencyController {
  constructor(
    private readonly currencyService: CurrencyService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @ApiOperation({ summary: AppStrings.CURRENCY_ALL_OPERATION })
  @ApiOkResponse({
    description: AppStrings.CURRENCY_ALL_RESPONSE,
    type: ArrayCurrencyResponse,
  })
  @ApiBody({ required: false, type: CurrencyFilter })
  @Post('all')
  async findAll(@Body() currencyFilter: CurrencyFilter) {
    const key = `${CacheRoutes.CURRENCY}/all-${JSON.stringify(currencyFilter)}`
    let currencies: ArrayCurrencyResponse = await this.cacheManager.get(key)

    if (currencies) {
      return currencies
    } else {
      currencies = await this.currencyService.findAll(currencyFilter)
      await this.cacheManager.set(key, currencies)
      return currencies
    }
  }
}
