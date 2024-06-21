import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common'
import { AgreementStatusService } from './agreement-status.service'
import { EntityService } from '../entity/entity.service'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBody,
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger'
import { I18nContext, I18nService } from 'nestjs-i18n'
import { CacheRoutes } from 'src/common/constants/constants'
import { AppStrings } from 'src/common/constants/strings'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { PermissionsGuard } from '../role-permission/guards/permission.guard'
import { CreateAgreementStatusDto, UpdateAgreementStatusDto } from './dto'
import { AgreementStatusFilter } from './filters'
import { StatusAgreementStatusResponse, ArrayAgreementStatusResponse } from './response'
import { AllExceptionsFilter } from 'src/common/exception.filter'

@ApiBearerAuth()
@ApiTags('Agreement Statuses')
@Controller('agreement-status')
@UseFilters(AllExceptionsFilter)
export class AgreementStatusController {
  constructor(
    private readonly agreementStatusService: AgreementStatusService,
    private readonly entityService: EntityService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.AgreementStatusCreate])
  @ApiOperation({ summary: AppStrings.AGREEMENT_STATUS_CREATE_OPERATION })
  @ApiCreatedResponse({
    description: AppStrings.AGREEMENT_STATUS_CREATED_RESPONSE,
    type: StatusAgreementStatusResponse,
  })
  @Post()
  async create(@Body() agreementStatus: CreateAgreementStatusDto) {
    const isEntityExists = await this.entityService.isExists(agreementStatus.entity_id)
    if (!isEntityExists)
      throw new NotFoundException(
        this.i18n.t('errors.entity_not_found', { lang: I18nContext.current().lang }),
      )

    const result = await this.agreementStatusService.create(agreementStatus)
    await this.clearCache()
    return result
  }

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.AgreementStatusGet])
  @ApiOperation({ summary: AppStrings.AGREEMENT_STATUS_ALL_OPERATION })
  @ApiOkResponse({
    description: AppStrings.AGREEMENT_STATUS_ALL_RESPONSE,
    type: ArrayAgreementStatusResponse,
  })
  @ApiBody({ required: false, type: AgreementStatusFilter })
  @Post('all')
  async findAll(@Body() agreementStatusFilter: AgreementStatusFilter) {
    const key = `${CacheRoutes.AGREEMENT_STATUS}/all-${JSON.stringify(agreementStatusFilter)}`
    let agreementStatuses: ArrayAgreementStatusResponse = await this.cacheManager.get(key)

    if (agreementStatuses) {
      return agreementStatuses
    } else {
      agreementStatuses = await this.agreementStatusService.findAll(agreementStatusFilter)
      await this.cacheManager.set(key, agreementStatuses)
      return agreementStatuses
    }
  }

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.AgreementStatusGet])
  @ApiOperation({ summary: AppStrings.AGREEMENT_STATUS_ALL_OPERATION })
  @ApiOkResponse({
    description: AppStrings.AGREEMENT_STATUS_ALL_RESPONSE,
    type: ArrayAgreementStatusResponse,
  })
  @Get('all')
  async getAll() {
    const key = `${CacheRoutes.AGREEMENT_STATUS}/all-{}`
    let agreementStatuses: ArrayAgreementStatusResponse = await this.cacheManager.get(key)

    if (agreementStatuses) {
      return agreementStatuses
    } else {
      agreementStatuses = await this.agreementStatusService.findAll({})
      await this.cacheManager.set(key, agreementStatuses)
      return agreementStatuses
    }
  }

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.AgreementStatusGet])
  @ApiOperation({ summary: AppStrings.AGREEMENT_STATUS_ALL_OPERATION })
  @ApiOkResponse({
    description: AppStrings.AGREEMENT_STATUS_ALL_RESPONSE,
    type: ArrayAgreementStatusResponse,
  })
  @Get('all/entity/:id')
  async getAllByEntity(@Param('id') entity_id: number) {
    const agreementStatusFilter = new AgreementStatusFilter()
    agreementStatusFilter.filter = {
      entity_id: entity_id,
    }

    const key = `${CacheRoutes.AGREEMENT_STATUS}/all-${JSON.stringify(agreementStatusFilter)}`
    let agreementStatuses: ArrayAgreementStatusResponse = await this.cacheManager.get(key)

    if (agreementStatuses) {
      return agreementStatuses
    } else {
      agreementStatuses = await this.agreementStatusService.findAll(agreementStatusFilter)
      await this.cacheManager.set(key, agreementStatuses)
      return agreementStatuses
    }
  }

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.AgreementStatusUpdate])
  @ApiOperation({ summary: AppStrings.AGREEMENT_STATUS_UPDATE_OPERATION })
  @ApiOkResponse({
    description: AppStrings.AGREEMENT_STATUS_UPDATE_RESPONSE,
    type: StatusAgreementStatusResponse,
  })
  @Patch()
  async update(@Body() agreementStatus: UpdateAgreementStatusDto) {
    const isExists = await this.agreementStatusService.isExists(agreementStatus.agreement_status_id)
    if (!isExists)
      throw new NotFoundException(
        this.i18n.t('errors.agreement_status_not_found', { lang: I18nContext.current().lang }),
      )

    if (agreementStatus.entity_id) {
      const isEntityExists = await this.entityService.isExists(agreementStatus.entity_id)
      if (!isEntityExists)
        throw new NotFoundException(
          this.i18n.t('errors.entity_not_found', { lang: I18nContext.current().lang }),
        )
    }

    const result = await this.agreementStatusService.update(agreementStatus)
    await this.clearCache()
    return result
  }

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.AgreementStatusDelete])
  @ApiOperation({ summary: AppStrings.AGREEMENT_STATUS_DELETE_OPERATION })
  @ApiOkResponse({
    description: AppStrings.AGREEMENT_STATUS_DELETE_RESPONSE,
    type: StatusAgreementStatusResponse,
  })
  @Delete(':id')
  async delete(@Param('id') agreement_status_id: number) {
    const isExists = await this.agreementStatusService.isExists(agreement_status_id)
    if (!isExists)
      throw new NotFoundException(
        this.i18n.t('errors.agreement_status_not_found', { lang: I18nContext.current().lang }),
      )

    const result = await this.agreementStatusService.delete(agreement_status_id)
    await this.clearCache()
    return result
  }

  async clearCache() {
    const keys = await this.cacheManager.store.keys(`${CacheRoutes.AGREEMENT_STATUS}*`) // Удаление кэша
    for (const key of keys) {
      await this.cacheManager.del(key)
    }

    const agreementKeys = await this.cacheManager.store.keys(`${CacheRoutes.AGREEMENT}*`) // Удаление кэша согласований
    for (const key of agreementKeys) {
      await this.cacheManager.del(key)
    }
  }
}
