import { HttpException, HttpStatus, Inject, UseGuards } from '@nestjs/common'
import { PropertiesService } from './properties.service'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { I18nService } from 'nestjs-i18n'
import { CacheRoutes } from 'src/common/constants/constants'
import { AppStrings } from 'src/common/constants/strings'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { CreatePropertyDto } from './dto'
import { ArrayPropertyResponse, StatusPropertyResponse } from './response'
import { PropertyFilter } from './filter'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver('property')
export class PropertiesResolver {
  constructor(
    private readonly propertiesService: PropertiesService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Mutation(() => StatusPropertyResponse, {
    name: 'create_property',
    description: AppStrings.PROPERTY_CREATE_OPERATION,
  })
  async create(@Args('property') property: CreatePropertyDto) {
    const result = await this.propertiesService.create(property)
    await this.clearCache()
    return result
  }

  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Query(() => ArrayPropertyResponse, { name: 'properties', description: AppStrings.PROPERTY_ALL_OPERATION })
  async findAll(@Args('filter') propertyFilter: PropertyFilter) {
    const key = `${CacheRoutes.PROPERTIES}/all-${JSON.stringify(propertyFilter)}`
    let properties: ArrayPropertyResponse = await this.cacheManager.get(key)

    if (properties) {
      return properties
    } else {
      properties = await this.propertiesService.findAll(propertyFilter)
      await this.cacheManager.set(key, properties)
      return properties
    }
  }

  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Mutation(() => StatusPropertyResponse, {
    name: 'delete_property',
    description: AppStrings.PROPERTY_DELETE_OPERATION,
  })
  async delete(@Args('uuid') id: string) {
    const isExists = await this.propertiesService.isExists(id)
    if (!isExists) {
      throw new HttpException(this.i18n.t('errors.property_not_found'), HttpStatus.NOT_FOUND)
    }

    const result = await this.propertiesService.delete(id)
    await this.clearCache()
    return result
  }

  async clearCache() {
    const keys = await this.cacheManager.store.keys(`${CacheRoutes.PROPERTIES}*`) // Удаление кэша
    for (const key of keys) {
      await this.cacheManager.del(key)
    }
  }
}
