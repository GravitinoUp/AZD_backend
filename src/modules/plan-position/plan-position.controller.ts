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
import { CacheRoutes } from 'src/common/constants/constants'
import { UserService } from '../user/user.service'
import { PlanWayService } from '../plan-way/plan-way.service'
import { OrganizationService } from '../organization/organization.service'
import { PermissionsGuard } from '../role-permission/guards/permission.guard'
import { PurchaseService } from '../purchase/purchase.service'
import { CreatePlanPositionDto, UpdatePlanPositionDto } from './dto'
import { PlanPositionFilter } from './filter'
import {
  StatusPlanPositionResponse,
  ArrayPlanPositionResponse,
  PlanPositionResponse,
} from './response'
import { PlanPositionService } from './plan-position.service'

@ApiBearerAuth()
@ApiTags('PlanPosition')
@Controller('plan-position')
@UseFilters(AllExceptionsFilter)
export class PlanPositionController {
  constructor(
    private readonly planService: PlanPositionService,
    private readonly purchaseService: PurchaseService,
    private readonly userService: UserService,
    private readonly wayService: PlanWayService,
    private readonly organizationService: OrganizationService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.PlanPositionCreate])
  @ApiOperation({ summary: AppStrings.PLAN_POSITION_CREATE_OPERATION })
  @ApiCreatedResponse({
    description: AppStrings.PLAN_POSITION_CREATE_RESPONSE,
    type: StatusPlanPositionResponse,
  })
  @Post()
  async create(@Body() plan: CreatePlanPositionDto) {
    if (plan.purchase_uuid) {
      const isPurchaseExists = await this.purchaseService.isExists(plan.purchase_uuid)
      if (!isPurchaseExists)
        throw new HttpException(this.i18n.t('errors.purchase_not_found'), HttpStatus.NOT_FOUND)
    }

    const isPlanExists = await this.planService.isExists(plan.plan_uuid)
    if (!isPlanExists)
      throw new HttpException(this.i18n.t('errors.plan_not_found'), HttpStatus.NOT_FOUND)

    const isUserExists = await this.userService.isExists({ user_uuid: plan.user_uuid })
    if (!isUserExists)
      throw new HttpException(this.i18n.t('errors.user_not_found'), HttpStatus.NOT_FOUND)

    const isWayExists = await this.wayService.isExists(plan.way_id)
    if (!isWayExists)
      throw new HttpException(this.i18n.t('errors.way_not_found'), HttpStatus.NOT_FOUND)

    const result = await this.planService.create(plan)
    await this.clearCache()
    return result
  }

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.PlanPositionGet])
  @ApiOperation({ summary: AppStrings.PLAN_POSITION_ALL_OPERATION })
  @ApiOkResponse({
    description: AppStrings.PLAN_POSITION_ALL_RESPONSE,
    type: ArrayPlanPositionResponse,
  })
  @ApiBody({ required: false, type: PlanPositionFilter })
  @Post('all')
  async findAll(@Body() planFilter: PlanPositionFilter) {
    const key = `${CacheRoutes.PLAN_POSITION}/all-${JSON.stringify(planFilter)}`
    let result: ArrayPlanPositionResponse = await this.cacheManager.get(key)

    if (result) {
      return result
    } else {
      result = await this.planService.findAll(planFilter)
      await this.cacheManager.set(key, result)
      return result
    }
  }

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.PlanPositionGet])
  @ApiOperation({ summary: AppStrings.PLAN_POSITION_ONE_OPERATION })
  @ApiOkResponse({
    description: AppStrings.PLAN_POSITION_ONE_RESPONSE,
    type: PlanPositionResponse,
  })
  @Get(':uuid')
  async findOne(@Param('uuid') planUuid: string) {
    const planFilter = new PlanPositionFilter()
    planFilter.filter = { plan_uuid: planUuid }

    const key = `${CacheRoutes.PLAN_POSITION}/${planUuid}-${JSON.stringify(planFilter)}`
    let result: PlanPositionResponse = await this.cacheManager.get(key)

    if (result) {
      return result
    } else {
      result = (await this.planService.findAll(planFilter)).data[0]
      await this.cacheManager.set(key, result)
      return result
    }
  }

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.PlanPositionUpdate])
  @ApiOperation({ summary: AppStrings.PLAN_POSITION_UPDATE_OPERATION })
  @ApiOkResponse({
    description: AppStrings.PLAN_POSITION_UPDATE_RESPONSE,
    type: StatusPlanPositionResponse,
  })
  @Patch()
  async update(@Body() plan: UpdatePlanPositionDto, @Req() request) {
    const isPlanPositionExists = await this.planService.isExists(plan.plan_uuid)
    if (!isPlanPositionExists)
      throw new HttpException(this.i18n.t('errors.plan_position_not_found'), HttpStatus.NOT_FOUND)

    if (plan.purchase_uuid) {
      const isPurchaseExists = await this.purchaseService.isExists(plan.purchase_uuid)
      if (!isPurchaseExists)
        throw new HttpException(this.i18n.t('errors.purchase_not_found'), HttpStatus.NOT_FOUND)
    }

    if (plan.plan_uuid) {
      const isPlanExists = await this.planService.isExists(plan.plan_uuid)
      if (!isPlanExists)
        throw new HttpException(this.i18n.t('errors.plan_not_found'), HttpStatus.NOT_FOUND)
    }

    if (plan.user_uuid) {
      const isUserExists = await this.userService.isExists({ user_uuid: plan.user_uuid })
      if (!isUserExists)
        throw new HttpException(this.i18n.t('errors.user_not_found'), HttpStatus.NOT_FOUND)
    }

    if (plan.way_id) {
      const isWayExists = await this.wayService.isExists(plan.way_id)
      if (!isWayExists)
        throw new HttpException(this.i18n.t('errors.way_not_found'), HttpStatus.NOT_FOUND)
    }

    const result = await this.planService.update(plan, request.user.user_uuid)
    await this.clearCache()
    return result
  }

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.PlanPositionDelete])
  @ApiOperation({ summary: AppStrings.PLAN_POSITION_DELETE_OPERATION })
  @ApiOkResponse({
    description: AppStrings.PLAN_POSITION_DELETE_RESPONSE,
    type: StatusPlanPositionResponse,
  })
  @Delete(':uuid')
  async delete(@Param('uuid') id: string) {
    const isExists = await this.planService.isExists(id)
    if (!isExists) {
      throw new HttpException(this.i18n.t('errors.plan_position_not_found'), HttpStatus.NOT_FOUND)
    }

    const result = await this.planService.delete(id)
    await this.clearCache()
    return result
  }

  async clearCache() {
    const keys = await this.cacheManager.store.keys(`${CacheRoutes.PLAN_POSITION}*`) // Удаление кэша
    for (const key of keys) {
      await this.cacheManager.del(key)
    }

    const planKeys = await this.cacheManager.store.keys(`${CacheRoutes.PLAN}*`) // Удаление кэша
    for (const key of planKeys) {
      await this.cacheManager.del(key)
    }

    const eventsKeys = await this.cacheManager.store.keys(`${CacheRoutes.PLAN_EVENT}*`) // Удаление кэша событий
    for (const key of eventsKeys) {
      await this.cacheManager.del(key)
    }
  }
}
