import { Inject, NotFoundException, UseGuards } from '@nestjs/common'
import { OrganizationService } from './organization.service'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { I18nService } from 'nestjs-i18n'
import { AppStrings } from 'src/common/constants/strings'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { CacheRoutes } from 'src/common/constants/constants'
import { CreateOrganizationDto, UpdateOrganizationDto } from './dto'
import { PersonService } from '../person/person.service'
import { OrganizationTypeService } from '../organization-type/organization-type.service'
import { ArrayOrganizationResponse, StatusOrganizationResponse } from './response'
import { OrganizationFilter } from './filters'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Organization } from './entities/organization.entity'

@Resolver(() => Organization)
export class OrganizationResolver {
  constructor(
    private readonly organizationService: OrganizationService,
    private readonly organizationTypeService: OrganizationTypeService,
    private readonly personService: PersonService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Mutation(() => StatusOrganizationResponse, {
    name: 'create_organization',
    description: AppStrings.ORGANIZATION_CREATE_OPERATION,
  })
  async create(@Args('organization') organization: CreateOrganizationDto) {
    const isOrganizationTypeExists = await this.organizationTypeService.isExists(organization.organization_type_id)
    if (!isOrganizationTypeExists) throw new NotFoundException(this.i18n.t('errors.organization_type_not_found'))

    const isPersonExists = await this.personService.isExists(organization.contact_person_uuid)
    if (!isPersonExists) throw new NotFoundException(this.i18n.t('errors.person_not_found'))

    const result = await this.organizationService.create(organization)
    await this.clearCache()
    return result
  }

  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Query(() => ArrayOrganizationResponse, { name: 'organizations', description: AppStrings.ORGANIZATION_ALL_OPERATION })
  async findAll(@Args('filter') organizationFilter: OrganizationFilter) {
    const key = `${CacheRoutes.ORGANIZATIONS}/all-${JSON.stringify(organizationFilter)}`
    let organizations: ArrayOrganizationResponse = await this.cacheManager.get(key)

    if (organizations) {
      return organizations
    } else {
      organizations = await this.organizationService.findAll(organizationFilter)
      await this.cacheManager.set(key, organizations)
      return organizations
    }
  }

  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Mutation(() => StatusOrganizationResponse, {
    name: 'update_organization',
    description: AppStrings.ORGANIZATION_UPDATE_OPERATION,
  })
  async update(@Args('organization') organization: UpdateOrganizationDto) {
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
  @Mutation(() => StatusOrganizationResponse, {
    name: 'delete_organization',
    description: AppStrings.ORGANIZATION_DELETE_OPERATION,
  })
  async delete(@Args('uuid') organization_uuid: string) {
    const isExists = await this.organizationService.isExists(organization_uuid)
    if (!isExists) throw new NotFoundException(this.i18n.t('errors.organization_not_found'))

    const result = await this.organizationService.delete(organization_uuid)
    await this.clearCache()
    return result
  }

  async clearCache() {
    const keys = await this.cacheManager.store.keys(`${CacheRoutes.ORGANIZATIONS}*`) // Удаление кэша
    for (const key of keys) {
      await this.cacheManager.del(key)
    }
  }
}
