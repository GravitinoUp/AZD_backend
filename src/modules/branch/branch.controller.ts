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
  Query,
  UseFilters,
  UseGuards,
} from '@nestjs/common'
import { BranchService } from './branch.service'
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { I18nContext, I18nService } from 'nestjs-i18n'
import { CacheRoutes } from 'src/common/constants/constants'
import { AppStrings } from 'src/common/constants/strings'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { PermissionsGuard } from '../role-permission/guards/permission.guard'
import { CreateBranchDto, UpdateBranchDto } from './dto'
import { BranchFilter } from './filters'
import { ArrayBranchResponse, StatusBranchResponse } from './response'

@ApiBearerAuth()
@ApiTags('Branches')
@Controller('branch')
@UseFilters(AllExceptionsFilter)
export class BranchController {
  constructor(
    private readonly branchService: BranchService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.BranchCreate])
  @ApiOperation({ summary: AppStrings.BRANCH_CREATE_OPERATION })
  @ApiCreatedResponse({
    description: AppStrings.BRANCH_CREATED_RESPONSE,
    type: StatusBranchResponse,
  })
  @Post()
  async create(@Body() branch: CreateBranchDto) {
    const result = await this.branchService.create(branch)
    await this.clearCache()
    return result
  }

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.BranchGet])
  @ApiOperation({ summary: AppStrings.BRANCH_ALL_OPERATION })
  @ApiOkResponse({
    description: AppStrings.BRANCH_ALL_RESPONSE,
    type: ArrayBranchResponse,
  })
  @ApiBody({ required: false, type: BranchFilter })
  @ApiQuery({ required: false, type: Boolean, name: 'include_properties' })
  @Post('all')
  async findAll(
    @Body() branchFilter: BranchFilter,
    @Query('include_properties') includeProperties?: boolean,
  ) {
    const key = `${CacheRoutes.BRANCH}/all-${JSON.stringify(branchFilter)}`
    let branchs: ArrayBranchResponse = await this.cacheManager.get(key)

    if (branchs) {
      return branchs
    } else {
      branchs = await this.branchService.findAll(branchFilter, includeProperties)
      await this.cacheManager.set(key, branchs)
      return branchs
    }
  }

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.BranchGet])
  @ApiOperation({ summary: AppStrings.BRANCH_ALL_OPERATION })
  @ApiOkResponse({
    description: AppStrings.BRANCH_ALL_RESPONSE,
    type: ArrayBranchResponse,
  })
  @ApiQuery({ required: false, type: Boolean, name: 'include_properties' })
  @Get('all')
  async getAll(@Query('include_properties') includeProperties?: boolean) {
    const key = `${CacheRoutes.BRANCH}/all-{}`
    let branchs: ArrayBranchResponse = await this.cacheManager.get(key)

    if (branchs) {
      return branchs
    } else {
      branchs = await this.branchService.findAll({}, includeProperties)
      await this.cacheManager.set(key, branchs)
      return branchs
    }
  }

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.BranchUpdate])
  @ApiOperation({ summary: AppStrings.BRANCH_UPDATE_OPERATION })
  @ApiOkResponse({
    description: AppStrings.BRANCH_UPDATE_RESPONSE,
    type: StatusBranchResponse,
  })
  @Patch()
  async update(@Body() branch: UpdateBranchDto) {
    const isExists = await this.branchService.isExists(branch.branch_uuid)
    if (!isExists)
      throw new NotFoundException(
        this.i18n.t('errors.branch_not_found', { lang: I18nContext.current().lang }),
      )

    const result = await this.branchService.update(branch)
    await this.clearCache()
    return result
  }

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.BranchDelete])
  @ApiOperation({ summary: AppStrings.BRANCH_DELETE_OPERATION })
  @ApiOkResponse({
    description: AppStrings.BRANCH_DELETE_RESPONSE,
    type: StatusBranchResponse,
  })
  @Delete(':uuid')
  async delete(@Param('uuid') branch_uuid: string) {
    const isExists = await this.branchService.isExists(branch_uuid)
    if (!isExists)
      throw new NotFoundException(
        this.i18n.t('errors.branch_not_found', { lang: I18nContext.current().lang }),
      )

    const result = await this.branchService.delete(branch_uuid)
    await this.clearCache()
    return result
  }

  async clearCache() {
    const keys = await this.cacheManager.store.keys(`${CacheRoutes.BRANCH}*`) // Удаление кэша
    for (const key of keys) {
      await this.cacheManager.del(key)
    }
  }
}
