import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common'
import { RoleAgreementService } from './role-agreement.service'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBody,
} from '@nestjs/swagger'
import { I18nService } from 'nestjs-i18n'
import { CacheRoutes } from 'src/common/constants/constants'
import { AppStrings } from 'src/common/constants/strings'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { EntityService } from '../entity/entity.service'
import { PermissionsGuard } from '../role-permission/guards/permission.guard'
import { CreateRoleAgreementDto, UpdateRoleAgreementDto } from './dto'
import { RoleAgreementFilter } from './filters'
import { StatusRoleAgreementResponse, ArrayRoleAgreementResponse } from './response'
import { RoleService } from '../role/role.service'
import { PermissionService } from '../permission/permission.service'

@ApiBearerAuth()
@ApiTags('Role Agreement')
@Controller('role-agreement')
@UseFilters(AllExceptionsFilter)
export class RoleAgreementController {
  constructor(
    private readonly roleAgreementService: RoleAgreementService,
    private readonly roleService: RoleService,
    private readonly permissionService: PermissionService,
    private readonly entityService: EntityService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.RoleAgreementCreate])
  @ApiOperation({ summary: AppStrings.ROLE_AGREEMENT_CREATE_OPERATION })
  @ApiCreatedResponse({
    description: AppStrings.ROLE_AGREEMENT_CREATED_RESPONSE,
    type: StatusRoleAgreementResponse,
  })
  @Post()
  async create(@Body() roleAgreement: CreateRoleAgreementDto) {
    if (roleAgreement.parent_role_id) {
      const isParentRoleExists = await this.roleService.isExists(roleAgreement.role_id)
      if (!isParentRoleExists)
        throw new NotFoundException(this.i18n.t('errors.parent_role_not_found'))
    }

    const isRoleExists = await this.roleService.isExists(roleAgreement.role_id)
    if (!isRoleExists) throw new NotFoundException(this.i18n.t('errors.role_not_found'))

    const isPermissionExists = await this.permissionService.isExists(roleAgreement.permission_id)
    if (!isPermissionExists) throw new NotFoundException(this.i18n.t('errors.permission_not_found'))

    const isEntityExists = await this.entityService.isExists(roleAgreement.entity_id)
    if (!isEntityExists) throw new NotFoundException(this.i18n.t('errors.entity_not_found'))

    const result = await this.roleAgreementService.create(roleAgreement)
    await this.clearCache()
    return result
  }

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.RoleAgreementGet])
  @ApiOperation({ summary: AppStrings.ROLE_AGREEMENT_ALL_OPERATION })
  @ApiOkResponse({
    description: AppStrings.ROLE_AGREEMENT_ALL_RESPONSE,
    type: ArrayRoleAgreementResponse,
  })
  @ApiBody({ required: false, type: RoleAgreementFilter })
  @Post('all')
  async findAll(@Body() roleAgreementFilter: RoleAgreementFilter) {
    const key = `${CacheRoutes.ROLE_AGREEMENT}/all-${JSON.stringify(roleAgreementFilter)}`
    let roleAgreementes: ArrayRoleAgreementResponse = await this.cacheManager.get(key)

    if (roleAgreementes) {
      return roleAgreementes
    } else {
      roleAgreementes = await this.roleAgreementService.findAll(roleAgreementFilter)
      await this.cacheManager.set(key, roleAgreementes)
      return roleAgreementes
    }
  }

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.RoleAgreementGet])
  @ApiOperation({ summary: AppStrings.ROLE_AGREEMENT_ALL_OPERATION })
  @ApiOkResponse({
    description: AppStrings.ROLE_AGREEMENT_ALL_RESPONSE,
    type: ArrayRoleAgreementResponse,
  })
  @Get('all')
  async getAll() {
    const key = `${CacheRoutes.ROLE_AGREEMENT}/all-{}`
    let roleAgreementes: ArrayRoleAgreementResponse = await this.cacheManager.get(key)

    if (roleAgreementes) {
      return roleAgreementes
    } else {
      roleAgreementes = await this.roleAgreementService.findAll({})
      await this.cacheManager.set(key, roleAgreementes)
      return roleAgreementes
    }
  }

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.RoleAgreementGet])
  @ApiOperation({ summary: AppStrings.ROLE_AGREEMENT_ALL_OPERATION })
  @ApiOkResponse({
    description: AppStrings.ROLE_AGREEMENT_ALL_RESPONSE,
    type: ArrayRoleAgreementResponse,
  })
  @Get('all/entity/:id')
  async getAllByEntity(@Param('id') entity_id: number) {
    const roleAgreementFilter = new RoleAgreementFilter()
    roleAgreementFilter.filter = {
      entity_id: entity_id,
    }

    const key = `${CacheRoutes.ROLE_AGREEMENT}/all-${JSON.stringify(roleAgreementFilter)}`
    let roleAgreementes: ArrayRoleAgreementResponse = await this.cacheManager.get(key)

    if (roleAgreementes) {
      return roleAgreementes
    } else {
      roleAgreementes = await this.roleAgreementService.findAll(roleAgreementFilter)
      await this.cacheManager.set(key, roleAgreementes)
      return roleAgreementes
    }
  }

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.RoleAgreementUpdate])
  @ApiOperation({ summary: AppStrings.ROLE_AGREEMENT_UPDATE_OPERATION })
  @ApiOkResponse({
    description: AppStrings.ROLE_AGREEMENT_UPDATE_RESPONSE,
    type: StatusRoleAgreementResponse,
  })
  @Patch()
  async update(@Body() roleAgreement: UpdateRoleAgreementDto) {
    const isExists = await this.roleAgreementService.isExists(roleAgreement.role_agreement_uuid)
    if (!isExists) throw new NotFoundException(this.i18n.t('errors.role_agreement_not_found'))

    if (roleAgreement.parent_role_id) {
      const isParentRoleExists = await this.roleService.isExists(roleAgreement.role_id)
      if (!isParentRoleExists)
        throw new NotFoundException(this.i18n.t('errors.parent_role_not_found'))
    }

    if (roleAgreement.role_id) {
      const isRoleExists = await this.roleService.isExists(roleAgreement.role_id)
      if (!isRoleExists) throw new NotFoundException(this.i18n.t('errors.role_not_found'))
    }

    if (roleAgreement.permission_id) {
      const isPermissionExists = await this.permissionService.isExists(roleAgreement.permission_id)
      if (!isPermissionExists)
        throw new NotFoundException(this.i18n.t('errors.permission_not_found'))
    }

    if (roleAgreement.entity_id) {
      const isEntityExists = await this.entityService.isExists(roleAgreement.entity_id)
      if (!isEntityExists) throw new NotFoundException(this.i18n.t('errors.entity_not_found'))
    }

    const result = await this.roleAgreementService.update(roleAgreement)
    await this.clearCache()
    return result
  }

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.RoleAgreementDelete])
  @ApiOperation({ summary: AppStrings.ROLE_AGREEMENT_DELETE_OPERATION })
  @ApiOkResponse({
    description: AppStrings.ROLE_AGREEMENT_DELETE_RESPONSE,
    type: StatusRoleAgreementResponse,
  })
  @Delete(':uuid')
  async delete(@Param('uuid') role_agreement_uuid: string) {
    const isExists = await this.roleAgreementService.isExists(role_agreement_uuid)
    if (!isExists) throw new NotFoundException(this.i18n.t('errors.role_agreement_not_found'))

    const result = await this.roleAgreementService.delete(role_agreement_uuid)
    await this.clearCache()
    return result
  }

  async clearCache() {
    const keys = await this.cacheManager.store.keys(`${CacheRoutes.ROLE_AGREEMENT}*`) // Удаление кэша
    for (const key of keys) {
      await this.cacheManager.del(key)
    }

    const agreementKeys = await this.cacheManager.store.keys(`${CacheRoutes.AGREEMENT}*`) // Удаление кэша согласований
    for (const key of agreementKeys) {
      await this.cacheManager.del(key)
    }
  }
}
