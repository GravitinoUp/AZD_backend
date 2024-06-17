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
  Query,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common'
import { PurchaseService } from './purchase.service'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { I18nService } from 'nestjs-i18n'
import { CacheRoutes } from 'src/common/constants/constants'
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiBody,
  ApiOkResponse,
  ApiBearerAuth,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger'
import { AppStrings } from 'src/common/constants/strings'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { ArrayPurchaseResponse, PurchaseResponse, StatusPurchaseResponse } from './response'
import { CreatePurchaseDto } from './dto'
import { PurchaseFilter } from './filter'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { PurchaseTypeService } from '../purchase-type/purchase-type.service'
import { UserService } from '../user/user.service'
import { OrganizationService } from '../organization/organization.service'
import { PermissionsGuard } from '../role-permission/guards/permission.guard'

@ApiBearerAuth()
@ApiTags('Purchases')
@Controller('purchase')
@UseFilters(AllExceptionsFilter)
export class PurchaseController {
  constructor(
    private readonly purchaseService: PurchaseService,
    private readonly purchaseTypeService: PurchaseTypeService,
    private readonly userService: UserService,
    private readonly organizationService: OrganizationService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.PurchaseCreate])
  @ApiOperation({ summary: AppStrings.PURCHASE_CREATE_OPERATION })
  @ApiCreatedResponse({
    description: AppStrings.PURCHASE_CREATE_RESPONSE,
    type: StatusPurchaseResponse,
  })
  @Post()
  async create(@Body() purchase: CreatePurchaseDto, @Req() request) {
    const isPurchaseTypeExists = await this.purchaseTypeService.isExists(purchase.purchase_type_id)
    if (!isPurchaseTypeExists)
      throw new HttpException(this.i18n.t('errors.purchase_type_not_found'), HttpStatus.NOT_FOUND)

    const isExecutorExists = await this.organizationService.isExists(purchase.executor_uuid)
    if (!isExecutorExists)
      throw new HttpException(this.i18n.t('errors.executor_not_found'), HttpStatus.NOT_FOUND)

    const result = await this.purchaseService.create(purchase, request.user.user_uuid)
    await this.clearCache()
    return result
  }

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.PurchaseGet])
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

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.PurchaseGet])
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

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.PurchaseDelete])
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

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.PurchaseDelete])
  @ApiOperation({ summary: AppStrings.PURCHASE_GET_CSMP_OPERATION })
  @ApiOkResponse({
    description: AppStrings.PURCHASE_GET_CSMP_RESPONSE,
    type: StatusPurchaseResponse,
  })
  @ApiQuery({ type: [Number], name: 'prices' })
  @ApiQuery({ type: String, name: 'formula', description: AppStrings.SMPC })
  @Get('get/start-max-price')
  async getStartMaxPrice(
    @Query('prices') prices: number[],
    @Query('formula') formula: 'avg' | 'min',
  ) {
    const result = await this.purchaseService.getStartMaxPrice(prices, formula)
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
