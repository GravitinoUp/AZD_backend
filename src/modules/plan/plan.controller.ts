import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Req,
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
import { AppStrings } from 'src/common/constants/strings'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { ArrayPlanResponse, PlanResponse, StatusPlanResponse } from './response'
import { CreatePlanDto, UpdatePlanDto } from './dto'
import { CacheRoutes } from 'src/common/constants/constants'
import { PlanFilter } from './filter'
import { UserService } from '../user/user.service'
import { PlanWayService } from '../plan-way/plan-way.service'
import { OrganizationService } from '../organization/organization.service'
import { PermissionsGuard } from '../role-permission/guards/permission.guard'

@ApiBearerAuth()
@ApiTags('Plan')
@Controller('plan')
@UseFilters(AllExceptionsFilter)
export class PlanController {
  constructor(
    private readonly planService: PlanService,
    private readonly userService: UserService,
    private readonly wayService: PlanWayService,
    private readonly organizationService: OrganizationService,
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
    let result: ArrayPlanResponse = await this.cacheManager.get(key)

    if (result) {
      return result
    } else {
      result = await this.planService.findAll(planFilter)
      await this.cacheManager.set(key, result)
      return result
    }
  }
  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.PlanGet])
  @ApiOperation({ summary: AppStrings.PLAN_ONE_OPERATION })
  @ApiOkResponse({
    description: AppStrings.PLAN_ONE_RESPONSE,
    type: PlanResponse,
  })
  @Get(':uuid')
  async findOne(@Param('uuid') planUuid: string) {
    const planFilter = new PlanFilter()
    planFilter.filter = { plan_uuid: planUuid }

    const key = `${CacheRoutes.PLAN}/${planUuid}-${JSON.stringify(planFilter)}`
    let result: PlanResponse = await this.cacheManager.get(key)

    if (result) {
      return result
    } else {
      result = (await this.planService.findAll(planFilter)).data[0]
      await this.cacheManager.set(key, result)
      return result
    }
  }

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.PlanUpdate])
  @ApiOperation({ summary: AppStrings.PLAN_UPDATE_OPERATION })
  @ApiOkResponse({
    description: AppStrings.PLAN_UPDATE_RESPONSE,
    type: StatusPlanResponse,
  })
  @Patch()
  async update(@Body() plan: UpdatePlanDto, @Req() request) {
    const isPlanExists = await this.planService.isExists(plan.plan_uuid)
    if (!isPlanExists)
      throw new HttpException(this.i18n.t('errors.plan_not_found'), HttpStatus.NOT_FOUND)

    if (plan.user_uuid) {
      const isUserExists = await this.userService.isExists({ user_uuid: plan.user_uuid })
      if (!isUserExists)
        throw new HttpException(this.i18n.t('errors.user_not_found'), HttpStatus.NOT_FOUND)
    }

    if (plan.way_id) {
      const isWayExists = await this.wayService.isExists(plan.way_id)
      if (!isWayExists)
        throw new HttpException(this.i18n.t('errors.user_not_found'), HttpStatus.NOT_FOUND)
    }

    if (plan.branch_uuid) {
      const isBranchExists = await this.organizationService.isExists(plan.branch_uuid)
      if (!isBranchExists)
        throw new HttpException(this.i18n.t('errors.organization_not_found'), HttpStatus.NOT_FOUND)
    }

    const result = await this.planService.update(plan, request.user.user_uuid)
    await this.clearCache()
    return result
  }

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.PlanDelete])
  @ApiOperation({ summary: AppStrings.PLAN_DELETE_OPERATION })
  @ApiOkResponse({
    description: AppStrings.PLAN_DELETE_RESPONSE,
    type: StatusPlanResponse,
  })
  @Delete(':uuid')
  async delete(@Param('uuid') id: string) {
    const isExists = await this.planService.isExists(id)
    if (!isExists) {
      throw new HttpException(this.i18n.t('errors.plan_not_found'), HttpStatus.NOT_FOUND)
    }

    const result = await this.planService.delete(id)
    await this.clearCache()
    return result
  }

  async clearCache() {
    const keys = await this.cacheManager.store.keys(`${CacheRoutes.PLAN}*`) // Удаление кэша
    for (const key of keys) {
      await this.cacheManager.del(key)
    }

    const eventsKeys = await this.cacheManager.store.keys(`${CacheRoutes.PLAN_EVENT}*`) // Удаление кэша событий
    for (const key of eventsKeys) {
      await this.cacheManager.del(key)
    }
  }
}
