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
import { OrganizationService } from './organization.service'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { ApiOperation, ApiCreatedResponse, ApiBearerAuth, ApiTags, ApiBody, ApiOkResponse } from '@nestjs/swagger'
import { I18nService } from 'nestjs-i18n'
import { AppStrings } from 'src/common/constants/strings'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { StatusRoleResponse } from '../role/response'
import { CacheRoutes } from 'src/common/constants/constants'
import { CreateOrganizationDto, UpdateOrganizationDto } from './dto'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { PersonService } from '../person/person.service'
import { OrganizationTypeService } from '../organization-type/organization-type.service'
import { ArrayOrganizationResponse } from './response'
import { OrganizationFilter } from './filters'
import { ArrayOrganizationTypeResponse } from '../organization-type/response'

@ApiBearerAuth()
@ApiTags('Organizations')
@Controller('organization')
@UseFilters(AllExceptionsFilter)
export class OrganizationController {
  constructor(
    private readonly organizationService: OrganizationService,
    private readonly organizationTypeService: OrganizationTypeService,
    private readonly personService: PersonService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @UseGuards(JwtAuthGuard, ActiveGuard)
  @ApiOperation({ summary: AppStrings.ORGANIZATION_CREATE_OPERATION })
  @ApiCreatedResponse({
    description: AppStrings.ORGANIZATION_CREATED_RESPONSE,
    type: StatusRoleResponse,
  })
  @Post()
  async create(@Body() organization: CreateOrganizationDto) {
    const isOrganizationTypeExists = await this.organizationTypeService.isExists(organization.organization_type_id)
    if (!isOrganizationTypeExists) throw new NotFoundException(this.i18n.t('errors.organization_type_not_found'))

    const isPersonExists = await this.personService.isExists(organization.contact_person_uuid)
    if (!isPersonExists) throw new NotFoundException(this.i18n.t('errors.person_not_found'))

    const result = await this.organizationService.create(organization)
    await this.clearCache()
    return result
  }

  @ApiOperation({ summary: AppStrings.ORGANIZATION_ALL_OPERATION })
  @ApiOkResponse({
    description: AppStrings.ORGANIZATION_ALL_RESPONSE,
    type: ArrayOrganizationResponse,
  })
  @ApiBody({ required: false, type: OrganizationFilter })
  @Post('all')
  async findAll(@Body() organizationFilter: OrganizationFilter) {
    const key = `${CacheRoutes.ORGANIZATION}/all-${JSON.stringify(organizationFilter)}`
    let organizations: ArrayOrganizationResponse = await this.cacheManager.get(key)

    if (organizations) {
      return organizations
    } else {
      organizations = await this.organizationService.findAll(organizationFilter)
      await this.cacheManager.set(key, organizations)
      return organizations
    }
  }

  @ApiOperation({ summary: AppStrings.ORGANIZATION_ALL_OPERATION })
  @ApiOkResponse({
    description: AppStrings.ORGANIZATION_ALL_RESPONSE,
    type: ArrayOrganizationTypeResponse,
  })
  @Get('all')
  async getAll() {
    const key = `${CacheRoutes.ORGANIZATION}/all-{}`
    let organizations: ArrayOrganizationResponse = await this.cacheManager.get(key)

    if (organizations) {
      return organizations
    } else {
      organizations = await this.organizationService.findAll({})
      await this.cacheManager.set(key, organizations)
      return organizations
    }
  }

  @UseGuards(JwtAuthGuard, ActiveGuard)
  @ApiOperation({ summary: AppStrings.ORGANIZATION_UPDATE_OPERATION })
  @ApiOkResponse({
    description: AppStrings.ORGANIZATION_UPDATE_RESPONSE,
    type: StatusRoleResponse,
  })
  @Patch()
  async update(@Body() organization: UpdateOrganizationDto) {
    const isExists = await this.organizationService.isExists(organization.organization_uuid)
    if (!isExists) throw new NotFoundException(this.i18n.t('errors.organization_not_found'))

    if (organization.organization_type_id) {
      const isOrganizationTypeExists = await this.organizationTypeService.isExists(organization.organization_type_id)
      if (!isOrganizationTypeExists) throw new NotFoundException(this.i18n.t('errors.organization_type_not_found'))
    }

    if (organization.contact_person_uuid) {
      const isPersonExists = await this.personService.isExists(organization.contact_person_uuid)
      if (!isPersonExists) throw new NotFoundException(this.i18n.t('errors.person_not_found'))
    }

    const result = await this.organizationService.update(organization)
    await this.clearCache()
    return result
  }

  @UseGuards(JwtAuthGuard, ActiveGuard)
  @ApiOperation({ summary: AppStrings.ORGANIZATION_DELETE_OPERATION })
  @ApiOkResponse({
    description: AppStrings.ORGANIZATION_DELETE_RESPONSE,
    type: StatusRoleResponse,
  })
  @Delete(':uuid')
  async delete(@Param('uuid') organization_uuid: string) {
    const isExists = await this.organizationService.isExists(organization_uuid)
    if (!isExists) throw new NotFoundException(this.i18n.t('errors.organization_not_found'))

    const result = await this.organizationService.delete(organization_uuid)
    await this.clearCache()
    return result
  }

  async clearCache() {
    const keys = await this.cacheManager.store.keys(`${CacheRoutes.ORGANIZATION}*`) // Удаление кэша
    for (const key of keys) {
      await this.cacheManager.del(key)
    }
  }
}
