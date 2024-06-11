import { Body, Controller, Inject, Post, UseFilters } from '@nestjs/common'
import { PersonService } from './person.service'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { I18nService } from 'nestjs-i18n'
import { CacheRoutes } from 'src/common/constants/constants'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { AppStrings } from 'src/common/constants/strings'
import { ArrayPersonResponse } from './response'
import { PersonFilter } from './filters'

@ApiBearerAuth()
@ApiTags('Persons')
@Controller('person')
@UseFilters(AllExceptionsFilter)
export class PersonController {
  constructor(
    private readonly personService: PersonService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @ApiOperation({ summary: AppStrings.PERSON_ALL_OPERATION })
  @ApiOkResponse({
    description: AppStrings.PERSON_ALL_RESPONSE,
    type: ArrayPersonResponse,
  })
  @ApiBody({ required: false, type: PersonFilter })
  @Post('all')
  async getAll(@Body() personFilter: PersonFilter) {
    const key = `${CacheRoutes.PERSON}/all-${JSON.stringify(personFilter)}`
    let persons: ArrayPersonResponse = await this.cacheManager.get(key)

    if (persons) {
      return persons
    } else {
      persons = await this.personService.findAll(personFilter)
      await this.cacheManager.set(key, persons)
      return persons
    }
  }

  async clearCache() {
    const keys = await this.cacheManager.store.keys(`${CacheRoutes.PERSON}*`) // Удаление кэша
    for (const key of keys) {
      await this.cacheManager.del(key)
    }
  }
}
