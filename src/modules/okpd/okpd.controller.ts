import { Body, Controller, Get, Inject, Post, UseFilters, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { I18nService } from 'nestjs-i18n'
import { CacheRoutes } from 'src/common/constants/constants'
import { AppStrings } from 'src/common/constants/strings'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { PermissionsGuard } from '../role-permission/guards/permission.guard'
import { OkpdFilter } from './filters'
import { OkpdService } from './okpd.service'
import { ArrayOkpdResponse } from './response'

@ApiBearerAuth()
@ApiTags('OKPD2')
@Controller('okpd')
@UseFilters(AllExceptionsFilter)
export class OkpdController {
  constructor(
    private readonly okpdService: OkpdService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.OkpdGet])
  @ApiOperation({ summary: AppStrings.OKPD_ALL_OPERATION })
  @ApiOkResponse({
    description: AppStrings.OKPD_ALL_RESPONSE,
    type: ArrayOkpdResponse,
  })
  @ApiBody({ required: false, type: OkpdFilter })
  @Post('all')
  async findAll(@Body() okpdFilter: OkpdFilter) {
    const key = `${CacheRoutes.OKPD}/all-${JSON.stringify(okpdFilter)}`
    let okpdList: ArrayOkpdResponse = await this.cacheManager.get(key)

    if (okpdList) {
      return okpdList
    } else {
      okpdList = await this.okpdService.findAll(okpdFilter)
      await this.cacheManager.set(key, okpdList)
      return okpdList
    }
  }

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.OkpdGet])
  @ApiOperation({ summary: AppStrings.OKPD_ALL_OPERATION })
  @ApiOkResponse({
    description: AppStrings.OKPD_ALL_RESPONSE,
    type: ArrayOkpdResponse,
  })
  @Get('all')
  async getAll() {
    const key = `${CacheRoutes.OKPD}/all-{}`
    let okpdList: ArrayOkpdResponse = await this.cacheManager.get(key)

    if (okpdList) {
      return okpdList
    } else {
      okpdList = await this.okpdService.findAll({})
      await this.cacheManager.set(key, okpdList)
      return okpdList
    }
  }
}
