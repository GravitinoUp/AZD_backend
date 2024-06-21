import {
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
  UseGuards,
} from '@nestjs/common'
import { CommercialOfferService } from './commercial-offer.service'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { I18nContext, I18nService } from 'nestjs-i18n'
import { AppStrings } from 'src/common/constants/strings'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { PermissionsGuard } from '../role-permission/guards/permission.guard'
import { BulkUpdateCommercialOfferDto, CreateCommercialOfferDto } from './dto'
import { ArrayCommercialOfferResponse, StatusCommercialOfferResponse } from './response'
import { CacheRoutes } from 'src/common/constants/constants'
import { PurchaseService } from '../purchase/purchase.service'
import { OrganizationService } from '../organization/organization.service'

@ApiBearerAuth()
@ApiTags('Commercial Offers')
@Controller('commercial-offer')
@UseFilters(AllExceptionsFilter)
export class CommercialOfferController {
  constructor(
    private readonly commercialOfferService: CommercialOfferService,
    private readonly purchaseService: PurchaseService,
    private readonly organizationService: OrganizationService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.CommercialOfferCreate])
  @ApiOperation({ summary: AppStrings.COMMERCIAL_OFFER_CREATE_OPERATION })
  @ApiCreatedResponse({
    description: AppStrings.COMMERCIAL_OFFER_CREATED_RESPONSE,
    type: StatusCommercialOfferResponse,
  })
  @Post()
  async create(@Body() commercialOffer: CreateCommercialOfferDto) {
    const isPurchaseService = await this.purchaseService.isExists(commercialOffer.purchase_uuid)
    if (!isPurchaseService)
      throw new NotFoundException(
        this.i18n.t('errors.purchase_not_found', { lang: I18nContext.current().lang }),
      )

    for (const organization of commercialOffer.organizations) {
      const isOrganizationExists = await this.organizationService.isExists(organization)
      if (!isOrganizationExists)
        throw new NotFoundException(
          `${this.i18n.t('errors.organization_not_found', { lang: I18nContext.current().lang })} (${organization})`,
        )
    }

    const result = await this.commercialOfferService.create(commercialOffer)
    await this.clearCache()
    return result
  }

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.CommercialOfferGet])
  @ApiOperation({ summary: AppStrings.COMMERCIAL_OFFER_ALL_OPERATION })
  @ApiOkResponse({
    description: AppStrings.COMMERCIAL_OFFER_ALL_RESPONSE,
    type: ArrayCommercialOfferResponse,
  })
  @Get('purchase/:purchase_uuid')
  async getAll(@Param('purchase_uuid') purchaseUuid: string) {
    const key = `${CacheRoutes.COMMERCIAL_OFFER}/purchase-${purchaseUuid}`
    let offers: ArrayCommercialOfferResponse = await this.cacheManager.get(key)

    if (offers) {
      return offers
    } else {
      offers = await this.commercialOfferService.findAllByPurchase(purchaseUuid)
      await this.cacheManager.set(key, offers)
      return offers
    }
  }

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.CommercialOfferUpdate])
  @ApiOperation({ summary: AppStrings.COMMERCIAL_OFFER_UPDATE_OPERATION })
  @ApiOkResponse({
    description: AppStrings.COMMERCIAL_OFFER_UPDATE_RESPONSE,
    type: StatusCommercialOfferResponse,
  })
  @ApiQuery({ type: String, name: 'formula', description: AppStrings.SMPC })
  @Patch()
  async update(
    @Body() commercialOffers: BulkUpdateCommercialOfferDto,
    @Query('formula') formula: 'avg' | 'min',
  ) {
    for (const offer of commercialOffers.offers) {
      const isExists = await this.commercialOfferService.isExists(offer.commercial_offer_uuid)
      if (!isExists)
        throw new NotFoundException(
          `${this.i18n.t('errors.commercial_offer_not_found', { lang: I18nContext.current().lang })} (${offer.commercial_offer_uuid})`,
        )
    }

    const result = await this.commercialOfferService.bulkUpdate(commercialOffers, formula)
    await this.clearCache()
    return result
  }

  async clearCache() {
    const keys = await this.cacheManager.store.keys(`${CacheRoutes.COMMERCIAL_OFFER}*`) // Удаление кэша
    for (const key of keys) {
      await this.cacheManager.del(key)
    }

    const purchaseKeys = await this.cacheManager.store.keys(`${CacheRoutes.PURCHASE}*`) // Удаление кэша закупок
    for (const key of purchaseKeys) {
      await this.cacheManager.del(key)
    }
  }
}