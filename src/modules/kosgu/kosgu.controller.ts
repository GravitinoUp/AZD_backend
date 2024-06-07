import { Body, Controller, Inject, Post, UseFilters } from '@nestjs/common'
import { KosguService } from './kosgu.service'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { ApiBearerAuth, ApiTags, ApiOperation, ApiOkResponse, ApiBody } from '@nestjs/swagger'
import { I18nService } from 'nestjs-i18n'
import { CacheRoutes } from 'src/common/constants/constants'
import { AppStrings } from 'src/common/constants/strings'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { KosguFilter } from '../kosgu/filters'
import { ArrayKosguResponse } from '../kosgu/response'

@ApiBearerAuth()
@ApiTags('KOSGU')
@Controller('kosgu')
@UseFilters(AllExceptionsFilter)
export class KosguController {
  constructor(
    private readonly kosguService: KosguService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @ApiOperation({ summary: AppStrings.KOSGU_ALL_OPERATION })
  @ApiOkResponse({
    description: AppStrings.KOSGU_ALL_RESPONSE,
    type: ArrayKosguResponse,
  })
  @ApiBody({ required: false, type: KosguFilter })
  @Post('all')
  async findAll(@Body() kosguFilter: KosguFilter) {
    const key = `${CacheRoutes.KOSGU}/all-${JSON.stringify(kosguFilter)}`
    let currencies: ArrayKosguResponse = await this.cacheManager.get(key)

    if (currencies) {
      return currencies
    } else {
      currencies = await this.kosguService.findAll(kosguFilter)
      await this.cacheManager.set(key, currencies)
      return currencies
    }
  }
}
