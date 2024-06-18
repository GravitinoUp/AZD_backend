import { Body, Controller, Get, Inject, Post, UseFilters } from '@nestjs/common'
import { EntityService } from './entity.service'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { ApiBearerAuth, ApiTags, ApiOperation, ApiOkResponse, ApiBody } from '@nestjs/swagger'
import { I18nService } from 'nestjs-i18n'
import { CacheRoutes } from 'src/common/constants/constants'
import { AppStrings } from 'src/common/constants/strings'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { AppEntityFilter } from './filters'
import { ArrayAppEntityResponse } from './response'

@ApiBearerAuth()
@ApiTags('Entities')
@Controller('entity')
@UseFilters(AllExceptionsFilter)
export class EntityController {
  constructor(
    private readonly entityService: EntityService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @ApiOperation({ summary: AppStrings.ENTITY_ALL_OPERATION })
  @ApiOkResponse({
    description: AppStrings.ENTITY_ALL_RESPONSE,
    type: ArrayAppEntityResponse,
  })
  @ApiBody({ required: false, type: AppEntityFilter })
  @Post('all')
  async findAll(@Body() entityFilter: AppEntityFilter) {
    const key = `${CacheRoutes.ENTITY}/all-${JSON.stringify(entityFilter)}`
    let entities: ArrayAppEntityResponse = await this.cacheManager.get(key)

    if (entities) {
      return entities
    } else {
      entities = await this.entityService.findAll(entityFilter)
      await this.cacheManager.set(key, entities)
      return entities
    }
  }

  @ApiOperation({ summary: AppStrings.ENTITY_ALL_OPERATION })
  @ApiOkResponse({
    description: AppStrings.ENTITY_ALL_RESPONSE,
    type: ArrayAppEntityResponse,
  })
  @Get('all')
  async getAll() {
    const key = `${CacheRoutes.ENTITY}/all-{}`
    let entities: ArrayAppEntityResponse = await this.cacheManager.get(key)

    if (entities) {
      return entities
    } else {
      entities = await this.entityService.findAll({})
      await this.cacheManager.set(key, entities)
      return entities
    }
  }
}
