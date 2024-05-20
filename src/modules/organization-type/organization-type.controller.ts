import { Body, Controller, Get, Inject, Post, UseFilters } from '@nestjs/common'
import { OrganizationTypeService } from './organization-type.service'
import { ApiOperation, ApiOkResponse, ApiBearerAuth, ApiTags, ApiBody } from '@nestjs/swagger'
import { CacheRoutes } from 'src/common/constants/constants'
import { AppStrings } from 'src/common/constants/strings'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { I18nService } from 'nestjs-i18n'
import { ArrayOrganizationTypeResponse } from './response'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { OrganizationTypeFilter } from './filters'

@ApiBearerAuth()
@ApiTags('Organization Types')
@Controller('organization-type')
@UseFilters(AllExceptionsFilter)
export class OrganizationTypeController {
  constructor(
    private readonly organizationTypeService: OrganizationTypeService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @ApiOkResponse({
    description: AppStrings.ROLE_ALL_RESPONSE,
    type: ArrayOrganizationTypeResponse,
  })
  @ApiBody({ required: false, type: OrganizationTypeFilter })
  @Post('all')
  async findAll(@Body() typeFilter: OrganizationTypeFilter) {
    const key = `${CacheRoutes.ORGANIZATION_TYPES}/all-${JSON.stringify(typeFilter)}`
    let types: ArrayOrganizationTypeResponse = await this.cacheManager.get(key)

    if (types) {
      return types
    } else {
      types = await this.organizationTypeService.findAll(typeFilter)
      await this.cacheManager.set(key, types)
      return types
    }
  }

  @ApiOperation({ summary: AppStrings.ORGANIZATION_TYPE_ALL_OPERATION })
  @ApiOkResponse({
    description: AppStrings.ORGANIZATION_TYPE_ALL_RESPONSE,
    type: ArrayOrganizationTypeResponse,
  })
  @Get('all')
  async getAll() {
    const key = `${CacheRoutes.ORGANIZATION_TYPES}/all-{}`
    let types: ArrayOrganizationTypeResponse = await this.cacheManager.get(key)

    if (types) {
      return types
    } else {
      types = await this.organizationTypeService.findAll({})
      await this.cacheManager.set(key, types)
      return types
    }
  }
}
