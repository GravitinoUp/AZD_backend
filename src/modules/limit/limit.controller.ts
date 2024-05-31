import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common'
import { LimitService } from './limit.service'
import { I18nService } from 'nestjs-i18n'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { ApiOperation, ApiCreatedResponse, ApiBody, ApiOkResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { CacheRoutes } from 'src/common/constants/constants'
import { AppStrings } from 'src/common/constants/strings'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { ArrayLimitResponse, StatusLimitResponse } from './response'
import { CreateLimitDto, UpdateLimitDto } from './dto'
import { LimitFilter } from './filters'
import { CurrencyService } from '../currency/currency.service'
import { AllExceptionsFilter } from 'src/common/exception.filter'

@ApiBearerAuth()
@ApiTags('Limit')
@Controller('limit')
@UseFilters(AllExceptionsFilter)
export class LimitController {
  constructor(
    private readonly limitService: LimitService,
    private readonly currencyService: CurrencyService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @UseGuards(JwtAuthGuard, ActiveGuard)
  @ApiOperation({ summary: AppStrings.LIMIT_CREATE_OPERATION })
  @ApiCreatedResponse({
    description: AppStrings.LIMIT_CREATE_RESPONSE,
    type: StatusLimitResponse,
  })
  @Post()
  async create(@Body() limit: CreateLimitDto) {
    if (limit.current_year_currency_code) {
      const isCurrencyCodeExists = await this.currencyService.isExists(limit.current_year_currency_code)
      if (!isCurrencyCodeExists)
        throw new HttpException(this.i18n.t('errors.currency_code_not_found'), HttpStatus.NOT_FOUND)
    }

    if (limit.first_year_currency_code) {
      const isCurrencyCodeExists = await this.currencyService.isExists(limit.first_year_currency_code)
      if (!isCurrencyCodeExists)
        throw new HttpException(this.i18n.t('errors.currency_code_not_found'), HttpStatus.NOT_FOUND)
    }

    if (limit.second_year_currency_code) {
      const isCurrencyCodeExists = await this.currencyService.isExists(limit.second_year_currency_code)
      if (!isCurrencyCodeExists)
        throw new HttpException(this.i18n.t('errors.currency_code_not_found'), HttpStatus.NOT_FOUND)
    }

    const result = await this.limitService.create(limit)
    await this.clearCache()
    return result
  }

  @ApiOperation({ summary: AppStrings.LIMIT_ALL_OPERATION })
  @ApiOkResponse({
    description: AppStrings.LIMIT_ALL_RESPONSE,
    type: ArrayLimitResponse,
  })
  @ApiBody({ required: false, type: LimitFilter })
  @Post('all')
  async findAll(@Body() limitFilter: LimitFilter) {
    const key = `${CacheRoutes.LIMIT}/all-${JSON.stringify(limitFilter)}`
    let result: ArrayLimitResponse = await this.cacheManager.get(key)

    if (result) {
      return result
    } else {
      result = await this.limitService.findAll(limitFilter)
      await this.cacheManager.set(key, result)
      return result
    }
  }

  @UseGuards(JwtAuthGuard, ActiveGuard)
  @ApiOperation({ summary: AppStrings.LIMIT_UPDATE_OPERATION })
  @ApiOkResponse({
    description: AppStrings.LIMIT_UPDATE_RESPONSE,
    type: StatusLimitResponse,
  })
  @Patch()
  async update(@Body() limit: UpdateLimitDto, @Req() request) {
    const isLimitExists = await this.limitService.isExists(limit.limit_uuid)
    if (!isLimitExists) throw new HttpException(this.i18n.t('errors.limit_not_found'), HttpStatus.NOT_FOUND)

    if (limit.current_year_currency_code) {
      const isCurrencyCodeExists = await this.currencyService.isExists(limit.current_year_currency_code)
      if (!isCurrencyCodeExists)
        throw new HttpException(this.i18n.t('errors.currency_code_not_found'), HttpStatus.NOT_FOUND)
    }

    if (limit.first_year_currency_code) {
      const isCurrencyCodeExists = await this.currencyService.isExists(limit.first_year_currency_code)
      if (!isCurrencyCodeExists)
        throw new HttpException(this.i18n.t('errors.currency_code_not_found'), HttpStatus.NOT_FOUND)
    }

    if (limit.second_year_currency_code) {
      const isCurrencyCodeExists = await this.currencyService.isExists(limit.second_year_currency_code)
      if (!isCurrencyCodeExists)
        throw new HttpException(this.i18n.t('errors.currency_code_not_found'), HttpStatus.NOT_FOUND)
    }

    const result = await this.limitService.update(limit, request.user.user_uuid)
    await this.clearCache()
    return result
  }

  @UseGuards(JwtAuthGuard, ActiveGuard)
  @ApiOperation({ summary: AppStrings.LIMIT_DELETE_OPERATION })
  @ApiOkResponse({
    description: AppStrings.LIMIT_DELETE_RESPONSE,
    type: StatusLimitResponse,
  })
  @Delete(':uuid')
  async delete(@Param('uuid') id: string) {
    const isExists = await this.limitService.isExists(id)
    if (!isExists) {
      throw new HttpException(this.i18n.t('errors.limit_not_found'), HttpStatus.NOT_FOUND)
    }

    const result = await this.limitService.delete(id)
    await this.clearCache()
    return result
  }

  async clearCache() {
    const keys = await this.cacheManager.store.keys(`${CacheRoutes.LIMIT}*`) // Удаление кэша
    for (const key of keys) {
      await this.cacheManager.del(key)
    }

    const eventsKeys = await this.cacheManager.store.keys(`${CacheRoutes.LIMIT_EVENT}*`) // Удаление кэша событий
    for (const key of eventsKeys) {
      await this.cacheManager.del(key)
    }
  }
}
