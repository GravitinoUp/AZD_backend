import { Body, Controller, HttpStatus, Inject, Post, UseFilters, UseGuards } from '@nestjs/common'
import { LimitStatusService } from './limit-status.service'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { I18nService } from 'nestjs-i18n'
import { CacheRoutes } from 'src/common/constants/constants'
import { AppStrings } from 'src/common/constants/strings'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { LimitStatusFilter } from './filters'
import { ArrayLimitStatusResponse } from './response'

@ApiBearerAuth()
@ApiTags('Limit Status')
@Controller('limit-status')
@UseFilters(AllExceptionsFilter)
export class LimitStatusController {
  constructor(
    private readonly limitStatusService: LimitStatusService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @ApiOperation({ summary: AppStrings.LIMIT_STATUS_ALL_OPERATION })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AppStrings.LIMIT_STATUS_ALL_RESPONSE,
    type: ArrayLimitStatusResponse,
  })
  @ApiBody({ required: false, type: LimitStatusFilter })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Post('all')
  async findAll(@Body() filter: LimitStatusFilter) {
    const key = `${CacheRoutes.LIMIT_STATUS}/all-${JSON.stringify(filter)}`
    let limitStatuses: ArrayLimitStatusResponse = await this.cacheManager.get(key)

    if (limitStatuses) {
      return limitStatuses
    } else {
      limitStatuses = await this.limitStatusService.findAll(filter)
      await this.cacheManager.set(key, limitStatuses)
      return limitStatuses
    }
  }
}
