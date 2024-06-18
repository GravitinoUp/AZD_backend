import { Body, Controller, Get, Inject, Post, UseFilters } from '@nestjs/common'
import { DocumentTypeService } from './document-type.service'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { ApiBearerAuth, ApiTags, ApiOperation, ApiOkResponse, ApiBody } from '@nestjs/swagger'
import { I18nService } from 'nestjs-i18n'
import { CacheRoutes } from 'src/common/constants/constants'
import { AppStrings } from 'src/common/constants/strings'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { DocumentTypeFilter } from './filters'
import { ArrayDocumentTypeResponse } from './response'

@ApiBearerAuth()
@ApiTags('Document Types')
@Controller('document-type')
@UseFilters(AllExceptionsFilter)
export class DocumentTypeController {
  constructor(
    private readonly documentTypeService: DocumentTypeService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @ApiOperation({ summary: AppStrings.DOCUMENT_TYPE_ALL_OPERATION })
  @ApiOkResponse({
    description: AppStrings.DOCUMENT_TYPE_ALL_RESPONSE,
    type: ArrayDocumentTypeResponse,
  })
  @ApiBody({ required: false, type: DocumentTypeFilter })
  @Post('all')
  async findAll(@Body() typeFilter: DocumentTypeFilter) {
    const key = `${CacheRoutes.DOCUMENT_TYPE}/all-${JSON.stringify(typeFilter)}`
    let types: ArrayDocumentTypeResponse = await this.cacheManager.get(key)

    if (types) {
      return types
    } else {
      types = await this.documentTypeService.findAll(typeFilter)
      await this.cacheManager.set(key, types)
      return types
    }
  }

  @ApiOperation({ summary: AppStrings.DOCUMENT_TYPE_ALL_OPERATION })
  @ApiOkResponse({
    description: AppStrings.DOCUMENT_TYPE_ALL_RESPONSE,
    type: ArrayDocumentTypeResponse,
  })
  @Get('all')
  async getAll() {
    const key = `${CacheRoutes.DOCUMENT_TYPE}/all-{}`
    let types: ArrayDocumentTypeResponse = await this.cacheManager.get(key)

    if (types) {
      return types
    } else {
      types = await this.documentTypeService.findAll({})
      await this.cacheManager.set(key, types)
      return types
    }
  }
}
