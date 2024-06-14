import { Body, Controller, Inject, Post, UseFilters } from '@nestjs/common'
import { KbkService } from './kbk.service'
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { I18nService } from 'nestjs-i18n'
import { CacheRoutes } from 'src/common/constants/constants'
import { AppStrings } from 'src/common/constants/strings'
import { KBKFilter } from './filters'
import { ArrayKBKResponse } from './response'

@ApiBearerAuth()
@ApiTags('KBK')
@Controller('kbk')
@UseFilters(AllExceptionsFilter)
export class KbkController {
  constructor(
    private readonly kbkService: KbkService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @ApiOperation({ summary: AppStrings.KBK_ALL_OPERATION })
  @ApiOkResponse({
    description: AppStrings.KBK_ALL_RESPONSE,
    type: ArrayKBKResponse,
  })
  @ApiBody({ required: false, type: KBKFilter })
  @Post('all')
  async findAll(@Body() kbkFilter: KBKFilter) {
    const key = `${CacheRoutes.KBK}/all-${JSON.stringify(kbkFilter)}`
    let currencies: ArrayKBKResponse = await this.cacheManager.get(key)

    if (currencies) {
      return currencies
    } else {
      currencies = await this.kbkService.findAllKBK(kbkFilter)
      await this.cacheManager.set(key, currencies)
      return currencies
    }
  }
}
