import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common'
import { PropertiesService } from './properties.service'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { I18nService } from 'nestjs-i18n'
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiTags,
  ApiOkResponse,
  ApiBody,
} from '@nestjs/swagger'
import { CacheRoutes } from 'src/common/constants/constants'
import { AppStrings } from 'src/common/constants/strings'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { CreatePropertyDto } from './dto'
import { ArrayPropertyResponse, StatusPropertyResponse } from './response'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { PropertyFilter } from './filter'
import { PermissionsGuard } from '../role-permission/guards/permission.guard'

@ApiBearerAuth()
@ApiTags('Properties')
@Controller('property')
@UseFilters(AllExceptionsFilter)
export class PropertiesController {
  constructor(
    private readonly propertiesService: PropertiesService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.PropertyCreate])
  @ApiOperation({ summary: AppStrings.PROPERTY_CREATE_OPERATION })
  @ApiCreatedResponse({
    description: AppStrings.PROPERTY_CREATE_RESPONSE,
    type: StatusPropertyResponse,
  })
  @Post()
  async create(@Body() property: CreatePropertyDto) {
    const result = await this.propertiesService.create(property)
    await this.clearCache()
    return result
  }

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.PropertyGet])
  @ApiOperation({ summary: AppStrings.PROPERTY_ALL_OPERATION })
  @ApiOkResponse({
    description: AppStrings.PROPERTY_ALL_RESPONSE,
    type: ArrayPropertyResponse,
  })
  @ApiBody({ type: PropertyFilter, required: false })
  @Post('all')
  async findAll(@Body() propertyFilter: PropertyFilter) {
    const key = `${CacheRoutes.PROPERTY}/all-${JSON.stringify(propertyFilter)}`
    let properties: ArrayPropertyResponse = await this.cacheManager.get(key)

    if (properties) {
      return properties
    } else {
      properties = await this.propertiesService.findAll(propertyFilter)
      await this.cacheManager.set(key, properties)
      return properties
    }
  }

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.PropertyDelete])
  @ApiOperation({ summary: AppStrings.PROPERTY_DELETE_OPERATION })
  @ApiOkResponse({
    description: AppStrings.PROPERTY_DELETE_RESPONSE,
    type: StatusPropertyResponse,
  })
  @Delete(':uuid')
  async delete(@Param('uuid') id: string) {
    const isExists = await this.propertiesService.isExists(id)
    if (!isExists) {
      throw new HttpException(this.i18n.t('errors.property_not_found'), HttpStatus.NOT_FOUND)
    }

    const result = await this.propertiesService.delete(id)
    await this.clearCache()
    return result
  }

  async clearCache() {
    const keys = await this.cacheManager.store.keys(`${CacheRoutes.PROPERTY}*`) // Удаление кэша
    for (const key of keys) {
      await this.cacheManager.del(key)
    }
  }
}
