import { Body, Controller, Get, Inject, Post, UseFilters, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiOkResponse, ApiBody, ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { CacheRoutes } from 'src/common/constants/constants'
import { AppStrings } from 'src/common/constants/strings'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { PermissionsGuard } from '../role-permission/guards/permission.guard'
import { OkeiFilter } from './filters'
import { ArrayOkeiResponse } from './response'
import { OkeiService } from './okei.service'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { I18nService } from 'nestjs-i18n'
import { AllExceptionsFilter } from 'src/common/exception.filter'

@ApiBearerAuth()
@ApiTags('OKEI')
@Controller('okei')
@UseFilters(AllExceptionsFilter)
export class OkeiController {
  constructor(
    private readonly okeiService: OkeiService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.OkeiGet])
  @ApiOperation({ summary: AppStrings.OKEI_ALL_OPERATION })
  @ApiOkResponse({
    description: AppStrings.OKEI_ALL_RESPONSE,
    type: ArrayOkeiResponse,
  })
  @ApiBody({ required: false, type: OkeiFilter })
  @Post('all')
  async findAll(@Body() okeiFilter: OkeiFilter) {
    const key = `${CacheRoutes.OKEI}/all-${JSON.stringify(okeiFilter)}`
    let okeiList: ArrayOkeiResponse = await this.cacheManager.get(key)

    if (okeiList) {
      return okeiList
    } else {
      okeiList = await this.okeiService.findAll(okeiFilter)
      await this.cacheManager.set(key, okeiList)
      return okeiList
    }
  }

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.OkeiGet])
  @ApiOperation({ summary: AppStrings.OKEI_ALL_OPERATION })
  @ApiOkResponse({
    description: AppStrings.OKEI_ALL_RESPONSE,
    type: ArrayOkeiResponse,
  })
  @Get('all')
  async getAll() {
    const key = `${CacheRoutes.OKEI}/all-{}`
    let okeiList: ArrayOkeiResponse = await this.cacheManager.get(key)

    if (okeiList) {
      return okeiList
    } else {
      okeiList = await this.okeiService.findAll({})
      await this.cacheManager.set(key, okeiList)
      return okeiList
    }
  }
}
