import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common'
import { AgreementService } from './agreement.service'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { CreateAgreementsDto, UpdateAgreementDto } from './dto'
import { CacheRoutes } from 'src/common/constants/constants'
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger'
import { I18nService } from 'nestjs-i18n'
import { AppStrings } from 'src/common/constants/strings'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { PermissionsGuard } from '../role-permission/guards/permission.guard'
import {
  ArrayAgreementResponse,
  StatusAgreementResponse,
  StatusArrayAgreementResponse,
} from './response'
import { AllExceptionsFilter } from 'src/common/exception.filter'

@ApiBearerAuth()
@ApiTags('Agreements')
@Controller('agreement')
@UseFilters(AllExceptionsFilter)
export class AgreementController {
  constructor(
    private readonly agreementService: AgreementService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.AgreementCreate])
  @ApiOperation({ summary: AppStrings.AGREEMENT_CREATE_OPERATION })
  @ApiCreatedResponse({
    description: AppStrings.AGREEMENT_CREATED_RESPONSE,
    type: StatusArrayAgreementResponse,
  })
  @Post()
  async create(@Body() agreement: CreateAgreementsDto) {
    const result = await this.agreementService.create(agreement)
    await this.clearCache()
    return result
  }

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.AgreementGet])
  @ApiOperation({ summary: AppStrings.AGREEMENT_BY_DOCUMENT_OPERATION })
  @ApiOkResponse({
    description: AppStrings.AGREEMENT_BY_DOCUMENT_RESPONSE,
    type: ArrayAgreementResponse,
  })
  @Get('document/:document_uuid/:entity_id')
  async getAll(@Param('document_uuid') documentUuid: string, @Param('entity_id') entityId: number) {
    const key = `${CacheRoutes.AGREEMENT}/document-${documentUuid}`
    let agreements: ArrayAgreementResponse = await this.cacheManager.get(key)

    if (agreements) {
      return agreements
    } else {
      agreements = await this.agreementService.findAllByDocument(documentUuid, entityId)
      await this.cacheManager.set(key, agreements)
      return agreements
    }
  }

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.AgreementUpdate])
  @ApiOperation({ summary: AppStrings.AGREEMENT_UPDATE_OPERATION })
  @ApiOkResponse({
    description: AppStrings.AGREEMENT_UPDATE_RESPONSE,
    type: StatusAgreementResponse,
  })
  @Patch()
  async update(@Body() agreement: UpdateAgreementDto, @Req() request) {
    const result = await this.agreementService.update(agreement, request.user.user_uuid)
    await this.clearCache()
    return result
  }

  async clearCache() {
    const keys = await this.cacheManager.store.keys(`${CacheRoutes.AGREEMENT}*`) // Удаление кэша
    for (const key of keys) {
      await this.cacheManager.del(key)
    }
  }
}
