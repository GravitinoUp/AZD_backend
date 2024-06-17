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
import { DocumentService } from './document.service'
import { OrganizationService } from '../organization/organization.service'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBody,
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger'
import { I18nService } from 'nestjs-i18n'
import { CacheRoutes } from 'src/common/constants/constants'
import { AppStrings } from 'src/common/constants/strings'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { DocumentTypeService } from '../document-type/document-type.service'
import { PersonService } from '../person/person.service'
import { PermissionsGuard } from '../role-permission/guards/permission.guard'
import { CreateDocumentDto, UpdateDocumentDto } from './dto'
import { DocumentFilter } from './filters'
import { StatusDocumentResponse, ArrayDocumentResponse } from './response'
import { PurchaseService } from '../purchase/purchase.service'
import { AllExceptionsFilter } from 'src/common/exception.filter'

@ApiBearerAuth()
@ApiTags('Documents')
@Controller('document')
@UseFilters(AllExceptionsFilter)
export class DocumentController {
  constructor(
    private readonly documentService: DocumentService,
    private readonly purchaseService: PurchaseService,
    private readonly documentTypeService: DocumentTypeService,
    private readonly organizationService: OrganizationService,
    private readonly personService: PersonService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.DocumentCreate])
  @ApiOperation({ summary: AppStrings.DOCUMENT_CREATE_OPERATION })
  @ApiCreatedResponse({
    description: AppStrings.DOCUMENT_CREATED_RESPONSE,
    type: StatusDocumentResponse,
  })
  @Post()
  async create(@Body() document: CreateDocumentDto) {
    if (document.document_name.length > 1000) {
      throw new NotFoundException(this.i18n.t('errors.document_name_length_limit'))
    }

    const isDocumentTypeExists = await this.documentTypeService.isExists(document.document_type_id)
    if (!isDocumentTypeExists)
      throw new NotFoundException(this.i18n.t('errors.document_type_not_found'))

    const isPurchaseExists = await this.purchaseService.isExists(document.purchase_uuid)
    if (!isPurchaseExists) throw new NotFoundException(this.i18n.t('errors.purchase_not_found'))

    if (document.executor_uuid) {
      const isExecutorExists = await this.organizationService.isExists(document.executor_uuid)
      if (!isExecutorExists)
        throw new NotFoundException(this.i18n.t('errors.document_executor_not_found'))
    }

    if (document.executor_person_uuid) {
      const isExecutorPersonExists = await this.personService.isExists(
        document.executor_person_uuid,
      )
      if (!isExecutorPersonExists)
        throw new NotFoundException(this.i18n.t('errors.document_executor_person_not_found'))
    }

    if (document.customer_uuid) {
      const isCustomerExists = await this.organizationService.isExists(document.customer_uuid)
      if (!isCustomerExists)
        throw new NotFoundException(this.i18n.t('errors.document_customer_not_found'))
    }

    if (document.customer_person_uuid) {
      const isCustomerPersonExists = await this.personService.isExists(
        document.customer_person_uuid,
      )
      if (!isCustomerPersonExists)
        throw new NotFoundException(this.i18n.t('errors.document_customer_person_not_found'))
    }

    const result = await this.documentService.create(document)
    await this.clearCache()
    return result
  }

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.DocumentGet])
  @ApiOperation({ summary: AppStrings.DOCUMENT_ALL_OPERATION })
  @ApiOkResponse({
    description: AppStrings.DOCUMENT_ALL_RESPONSE,
    type: ArrayDocumentResponse,
  })
  @ApiBody({ required: false, type: DocumentFilter })
  @Post('all')
  async findAll(@Body() documentFilter: DocumentFilter) {
    const key = `${CacheRoutes.DOCUMENT}/all-${JSON.stringify(documentFilter)}`
    let documents: ArrayDocumentResponse = await this.cacheManager.get(key)

    if (documents) {
      return documents
    } else {
      documents = await this.documentService.findAll(documentFilter)
      await this.cacheManager.set(key, documents)
      return documents
    }
  }

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.DocumentGet])
  @ApiOperation({ summary: AppStrings.DOCUMENT_ALL_BY_TYPE_OPERATION })
  @ApiOkResponse({
    description: AppStrings.DOCUMENT_ALL_BY_TYPE_RESPONSE,
    type: ArrayDocumentResponse,
  })
  @ApiBody({ required: false, type: DocumentFilter })
  @Post('all/type/:type_id')
  async findAllByType(@Body() documentFilter: DocumentFilter, @Param('type_id') typeId: number) {
    if (documentFilter.filter) {
      documentFilter.filter.document_type_id = Number(typeId)
    } else {
      documentFilter.filter = { document_type_id: Number(typeId) }
    }

    const key = `${CacheRoutes.DOCUMENT}/all-type-${typeId}-${JSON.stringify(documentFilter)}`
    let documents: ArrayDocumentResponse = await this.cacheManager.get(key)

    if (documents) {
      return documents
    } else {
      documents = await this.documentService.findAll(documentFilter)
      await this.cacheManager.set(key, documents)
      return documents
    }
  }

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.DocumentGet])
  @ApiOperation({ summary: AppStrings.DOCUMENT_ALL_OPERATION })
  @ApiOkResponse({
    description: AppStrings.DOCUMENT_ALL_RESPONSE,
    type: ArrayDocumentResponse,
  })
  @Get('all')
  async getAll() {
    const key = `${CacheRoutes.DOCUMENT}/all-{}`
    let documents: ArrayDocumentResponse = await this.cacheManager.get(key)

    if (documents) {
      return documents
    } else {
      documents = await this.documentService.findAll({})
      await this.cacheManager.set(key, documents)
      return documents
    }
  }

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.DocumentUpdate])
  @ApiOperation({ summary: AppStrings.DOCUMENT_UPDATE_OPERATION })
  @ApiOkResponse({
    description: AppStrings.DOCUMENT_UPDATE_RESPONSE,
    type: StatusDocumentResponse,
  })
  @Patch()
  async update(@Body() document: UpdateDocumentDto) {
    if (document.document_name.length > 1000) {
      throw new NotFoundException(this.i18n.t('errors.document_name_length_limit'))
    }

    const isExists = await this.documentService.isExists(document.document_uuid)
    if (!isExists) throw new NotFoundException(this.i18n.t('errors.document_not_found'))

    if (document.document_type_id) {
      const isDocumentTypeExists = await this.documentTypeService.isExists(
        document.document_type_id,
      )
      if (!isDocumentTypeExists)
        throw new NotFoundException(this.i18n.t('errors.document_type_not_found'))
    }

    if (document.purchase_uuid) {
      const isPurchaseExists = await this.purchaseService.isExists(document.purchase_uuid)
      if (!isPurchaseExists) throw new NotFoundException(this.i18n.t('errors.purchase_not_found'))
    }

    if (document.executor_uuid) {
      const isExecutorExists = await this.organizationService.isExists(document.executor_uuid)
      if (!isExecutorExists)
        throw new NotFoundException(this.i18n.t('errors.document_executor_not_found'))
    }

    if (document.executor_person_uuid) {
      const isExecutorPersonExists = await this.personService.isExists(
        document.executor_person_uuid,
      )
      if (!isExecutorPersonExists)
        throw new NotFoundException(this.i18n.t('errors.document_executor_person_not_found'))
    }

    if (document.customer_uuid) {
      const isCustomerExists = await this.organizationService.isExists(document.customer_uuid)
      if (!isCustomerExists)
        throw new NotFoundException(this.i18n.t('errors.document_customer_not_found'))
    }

    if (document.customer_person_uuid) {
      const isCustomerPersonExists = await this.personService.isExists(
        document.customer_person_uuid,
      )
      if (!isCustomerPersonExists)
        throw new NotFoundException(this.i18n.t('errors.document_customer_person_not_found'))
    }

    const result = await this.documentService.update(document)
    await this.clearCache()
    return result
  }

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.DocumentDelete])
  @ApiOperation({ summary: AppStrings.DOCUMENT_DELETE_OPERATION })
  @ApiOkResponse({
    description: AppStrings.DOCUMENT_DELETE_RESPONSE,
    type: StatusDocumentResponse,
  })
  @Delete(':uuid')
  async delete(@Param('uuid') document_uuid: string) {
    const isExists = await this.documentService.isExists(document_uuid)
    if (!isExists) throw new NotFoundException(this.i18n.t('errors.document_not_found'))

    const result = await this.documentService.delete(document_uuid)
    await this.clearCache()
    return result
  }

  async clearCache() {
    const keys = await this.cacheManager.store.keys(`${CacheRoutes.DOCUMENT}*`) // Удаление кэша
    for (const key of keys) {
      await this.cacheManager.del(key)
    }
  }
}
