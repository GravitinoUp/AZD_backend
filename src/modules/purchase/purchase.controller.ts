import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common'
import { PurchaseService } from './purchase.service'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { I18nService } from 'nestjs-i18n'
import { CacheRoutes } from 'src/common/constants/constants'
import { ApiOperation, ApiCreatedResponse, ApiBody, ApiOkResponse } from '@nestjs/swagger'
import { AppStrings } from 'src/common/constants/strings'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { ArrayPurchaseResponse, PurchaseResponse, StatusPurchaseResponse } from './response'
import { CreatePurchaseDto } from './dto'
import { PurchaseFilter } from './filter'

@Controller('purchase')
export class PurchaseController {
  constructor(
    private readonly purchaseService: PurchaseService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @UseGuards(JwtAuthGuard, ActiveGuard)
  @ApiOperation({ summary: AppStrings.PURCHASE_CREATE_OPERATION })
  @ApiCreatedResponse({
    description: AppStrings.PURCHASE_CREATE_RESPONSE,
    type: StatusPurchaseResponse,
  })
  @Post()
  async create(@Body() purchase: CreatePurchaseDto) {
    const result = await this.purchaseService.create(purchase)
    await this.clearCache()
    return result
  }

  @ApiOperation({ summary: AppStrings.PURCHASE_ALL_OPERATION })
  @ApiOkResponse({
    description: AppStrings.PURCHASE_ALL_RESPONSE,
    type: ArrayPurchaseResponse,
  })
  @ApiBody({ required: false, type: PurchaseFilter })
  @Post('all')
  async findAll(@Body() purchaseFilter: PurchaseFilter) {
    const key = `${CacheRoutes.PURCHASE}/all-${JSON.stringify(purchaseFilter)}`
    let result: ArrayPurchaseResponse = await this.cacheManager.get(key)

    if (result) {
      return result
    } else {
      result = await this.purchaseService.findAll(purchaseFilter)
      await this.cacheManager.set(key, result)
      return result
    }
  }

  @ApiOperation({ summary: AppStrings.PURCHASE_ONE_OPERATION })
  @ApiOkResponse({
    description: AppStrings.PURCHASE_ONE_RESPONSE,
    type: PurchaseResponse,
  })
  @Get(':uuid')
  async findOne(@Param('uuid') purchaseUuid: string) {
    const purchaseFilter = new PurchaseFilter()
    purchaseFilter.filter = { purchase_uuid: purchaseUuid }

    const key = `${CacheRoutes.PURCHASE}/${purchaseUuid}-${JSON.stringify(purchaseFilter)}`
    let result: PurchaseResponse = await this.cacheManager.get(key)

    if (result) {
      return result
    } else {
      result = (await this.purchaseService.findAll(purchaseFilter)).data[0]
      await this.cacheManager.set(key, result)
      return result
    }
  }

  @UseGuards(JwtAuthGuard, ActiveGuard)
  @ApiOperation({ summary: AppStrings.PURCHASE_DELETE_OPERATION })
  @ApiOkResponse({
    description: AppStrings.PURCHASE_DELETE_RESPONSE,
    type: StatusPurchaseResponse,
  })
  @Delete(':uuid')
  async delete(@Param('uuid') id: string) {
    const isExists = await this.purchaseService.isExists(id)
    if (!isExists) {
      throw new HttpException(this.i18n.t('errors.purchase_not_found'), HttpStatus.NOT_FOUND)
    }

    const result = await this.purchaseService.delete(id)
    await this.clearCache()
    return result
  }

  async clearCache() {
    const keys = await this.cacheManager.store.keys(`${CacheRoutes.PURCHASE}*`) // Удаление кэша
    for (const key of keys) {
      await this.cacheManager.del(key)
    }

    const eventsKeys = await this.cacheManager.store.keys(`${CacheRoutes.PURCHASE_EVENT}*`) // Удаление кэша событий
    for (const key of eventsKeys) {
      await this.cacheManager.del(key)
    }
  }
}
