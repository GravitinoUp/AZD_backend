import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common'
import { PlanService } from './plan.service'
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { I18nService } from 'nestjs-i18n'
import { CacheRoutes } from 'src/common/constants/constants'
import { AppStrings } from 'src/common/constants/strings'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { PermissionsGuard } from '../role-permission/guards/permission.guard'
import { CreatePlanDto } from './dto'
import { PlanFilter } from './filters'
import { StatusPlanResponse, ArrayPlanResponse } from './response'
import { BranchService } from '../branch/branch.service'

@ApiBearerAuth()
@ApiTags('Plans')
@Controller('plan')
@UseFilters(AllExceptionsFilter)
export class PlanController {
  constructor(
    private readonly planService: PlanService,
    private readonly branchService: BranchService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.PlanCreate])
  @ApiOperation({ summary: AppStrings.PLAN_CREATE_OPERATION })
  @ApiCreatedResponse({
    description: AppStrings.PLAN_CREATE_RESPONSE,
    type: StatusPlanResponse,
  })
  @Post()
  async create(@Body() plan: CreatePlanDto) {
    const isBranchExists = await this.branchService.isExists(plan.branch_uuid)
    if (!isBranchExists)
      throw new HttpException(this.i18n.t('errors.branch_not_found'), HttpStatus.NOT_FOUND)

    const result = await this.planService.create(plan)
    await this.clearCache()
    return result
  }

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.PlanGet])
  @ApiOperation({ summary: AppStrings.PLAN_ALL_OPERATION })
  @ApiOkResponse({
    description: AppStrings.PLAN_ALL_RESPONSE,
    type: ArrayPlanResponse,
  })
  @ApiBody({ required: false, type: PlanFilter })
  @Post('all')
  async findAll(@Body() planFilter: PlanFilter) {
    const key = `${CacheRoutes.PLAN}/all-${JSON.stringify(planFilter)}`
    let plans: ArrayPlanResponse = await this.cacheManager.get(key)

    if (plans) {
      return plans
    } else {
      plans = await this.planService.findAll(planFilter)
      await this.cacheManager.set(key, plans)
      return plans
    }
  }

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.PlanGet])
  @ApiOperation({ summary: AppStrings.PLAN_ALL_OPERATION })
  @ApiOkResponse({
    description: AppStrings.PLAN_ALL_RESPONSE,
    type: ArrayPlanResponse,
  })
  @Get('all')
  async getAll() {
    const key = `${CacheRoutes.PLAN}/all-{}`
    let plans: ArrayPlanResponse = await this.cacheManager.get(key)

    if (plans) {
      return plans
    } else {
      plans = await this.planService.findAll({})
      await this.cacheManager.set(key, plans)
      return plans
    }
  }

  // @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // // @HasPermissions([PermissionEnum.PlanUpdate])
  // @ApiOperation({ summary: AppStrings.PLAN_UPDATE_OPERATION })
  // @ApiOkResponse({
  //   description: AppStrings.PLAN_UPDATE_RESPONSE,
  //   type: StatusPlanResponse,
  // })
  // @Patch()
  // async update(@Body() plan: UpdatePlanDto) {
  //   const isExists = await this.planService.isExists(plan.plan_uuid)
  //   if (!isExists) throw new NotFoundException(this.i18n.t('errors.plan_not_found'))

  //   const result = await this.planService.update(plan)
  //   await this.clearCache()
  //   return result
  // }

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.PlanDelete])
  @ApiOperation({ summary: AppStrings.PLAN_DELETE_OPERATION })
  @ApiOkResponse({
    description: AppStrings.PLAN_DELETE_RESPONSE,
    type: StatusPlanResponse,
  })
  @Delete(':uuid')
  async delete(@Param('uuid') plan_uuid: string) {
    const isExists = await this.planService.isExists(plan_uuid)
    if (!isExists) throw new NotFoundException(this.i18n.t('errors.plan_not_found'))

    const result = await this.planService.delete(plan_uuid)
    await this.clearCache()
    return result
  }

  async clearCache() {
    const keys = await this.cacheManager.store.keys(`${CacheRoutes.PLAN}*`) // Удаление кэша
    for (const key of keys) {
      await this.cacheManager.del(key)
    }

    const positionKeys = await this.cacheManager.store.keys(`${CacheRoutes.PLAN_POSITION}*`) // Удаление кэша позиций
    for (const key of positionKeys) {
      await this.cacheManager.del(key)
    }
  }
}
