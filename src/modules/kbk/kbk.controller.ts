import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common'
import { KbkService } from './kbk.service'
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { I18nContext, I18nService } from 'nestjs-i18n'
import { CacheRoutes } from 'src/common/constants/constants'
import { AppStrings } from 'src/common/constants/strings'
import { KBKFilter } from './filters'
import { ArrayKBKResponse, ArrayKBKValueResponse, StatusKBKValueResponse } from './response'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { PermissionsGuard } from '../role-permission/guards/permission.guard'
import { CreateKBKValueDto } from './dto'

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

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.KBKValueCreate])
  @ApiOperation({ summary: AppStrings.KBK_VALUE_CREATE_OPERATION })
  @ApiCreatedResponse({
    description: AppStrings.KBK_VALUE_CREATE_RESPONSE,
    type: StatusKBKValueResponse,
  })
  @Post('value')
  async create(@Body() value: CreateKBKValueDto): Promise<StatusKBKValueResponse> {
    const isTypeExists = await this.kbkService.isTypeExists(value.kbk_type_id)
    if (!isTypeExists)
      throw new HttpException(
        this.i18n.t('errors.kbk_type_not_found', { lang: I18nContext.current().lang }),
        HttpStatus.NOT_FOUND,
      )

    const result = await this.kbkService.createValue(value)
    await this.clearCache()
    return result
  }

  @ApiOperation({ summary: AppStrings.KBK_ALL_OPERATION })
  @ApiOkResponse({
    description: AppStrings.KBK_ALL_RESPONSE,
    type: ArrayKBKResponse,
  })
  @ApiBody({ required: false, type: KBKFilter })
  @Post('all')
  async findAll(@Body() kbkFilter: KBKFilter) {
    const key = `${CacheRoutes.KBK}/all-${JSON.stringify(kbkFilter)}`
    let kbk: ArrayKBKResponse = await this.cacheManager.get(key)

    if (kbk) {
      return kbk
    } else {
      kbk = await this.kbkService.findAllKBK(kbkFilter)
      await this.cacheManager.set(key, kbk)
      return kbk
    }
  }

  @ApiOperation({ summary: AppStrings.KBK_VALUE_BY_TYPE_OPERATION })
  @ApiOkResponse({
    description: AppStrings.KBK_VALUE_BY_TYPE_RESPONSE,
    type: ArrayKBKValueResponse,
  })
  @Get('values/type/:type_id')
  async findValuesByType(@Param('type_id') type_id: number) {
    const key = `${CacheRoutes.KBK}/values-type-${type_id}`
    let values: ArrayKBKValueResponse = await this.cacheManager.get(key)

    if (values) {
      return values
    } else {
      values = await this.kbkService.findValuesByType(type_id)
      await this.cacheManager.set(key, values)
      return values
    }
  }

  async clearCache() {
    const keys = await this.cacheManager.store.keys(`${CacheRoutes.KBK_VALUE}*`) // Удаление кэша
    for (const key of keys) {
      await this.cacheManager.del(key)
    }

    const eventsKeys = await this.cacheManager.store.keys(`${CacheRoutes.KBK}*`) // Удаление кэша КБК
    for (const key of eventsKeys) {
      await this.cacheManager.del(key)
    }
  }
}
