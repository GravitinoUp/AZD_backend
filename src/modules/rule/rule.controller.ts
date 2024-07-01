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
import { RuleService } from './rule.service'
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
import { I18nContext, I18nService } from 'nestjs-i18n'
import { CacheRoutes } from 'src/common/constants/constants'
import { AppStrings } from 'src/common/constants/strings'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { PermissionsGuard } from '../role-permission/guards/permission.guard'
import { CreateRuleDto, UpdateRuleDto } from './dto'
import { RuleFilter } from './filters'
import { StatusRuleResponse, ArrayRuleResponse } from './response'

@ApiBearerAuth()
@ApiTags('Rules')
@Controller('rule')
@UseFilters(AllExceptionsFilter)
export class RuleController {
  constructor(
    private readonly ruleService: RuleService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.RuleCreate])
  @ApiOperation({ summary: AppStrings.RULE_CREATE_OPERATION })
  @ApiCreatedResponse({
    description: AppStrings.RULE_CREATE_RESPONSE,
    type: StatusRuleResponse,
  })
  @Post()
  async create(@Body() createRuleDto: CreateRuleDto) {
    const result = await this.ruleService.create(createRuleDto)
    await this.clearCache()
    return result
  }

  @UseGuards(JwtAuthGuard, ActiveGuard)
  @ApiOkResponse({
    description: AppStrings.RULE_ALL_RESPONSE,
    type: ArrayRuleResponse,
  })
  @ApiBody({ required: false, type: RuleFilter })
  @Post('all')
  async findAll(@Body() ruleFilter: RuleFilter) {
    const key = `${CacheRoutes.RULE}/all-${JSON.stringify(ruleFilter)}`
    let rules: ArrayRuleResponse = await this.cacheManager.get(key)

    if (rules) {
      return rules
    } else {
      rules = await this.ruleService.findAll(ruleFilter)
      await this.cacheManager.set(key, rules)
      return rules
    }
  }

  @ApiOperation({ summary: AppStrings.RULE_ALL_OPERATION })
  @ApiOkResponse({
    description: AppStrings.RULE_ALL_RESPONSE,
    type: ArrayRuleResponse,
  })
  @Get('all')
  async getAll() {
    const key = `${CacheRoutes.RULE}/all-{}`
    let rules: ArrayRuleResponse = await this.cacheManager.get(key)

    if (rules) {
      return rules
    } else {
      rules = await this.ruleService.findAll({})
      await this.cacheManager.set(key, rules)
      return rules
    }
  }

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.RuleUpdate])
  @ApiOperation({ summary: AppStrings.RULE_UPDATE_OPERATION })
  @ApiOkResponse({
    description: AppStrings.RULE_UPDATE_RESPONSE,
    type: StatusRuleResponse,
  })
  @Patch()
  async update(@Body() updateRuleDto: UpdateRuleDto) {
    const isExists = await this.ruleService.isExists(updateRuleDto.rule_uuid)
    if (!isExists) {
      throw new NotFoundException(
        this.i18n.t('errors.rule_not_found', { lang: I18nContext.current().lang }),
      )
    }

    const result = await this.ruleService.update(updateRuleDto)
    await this.clearCache()
    return result
  }

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.RuleDelete])
  @ApiOperation({ summary: AppStrings.RULE_DELETE_OPERATION })
  @ApiOkResponse({
    description: AppStrings.RULE_DELETE_RESPONSE,
    type: StatusRuleResponse,
  })
  @Delete(':uuid')
  async delete(@Param('uuid') rule_uuid: string) {
    const isExists = await this.ruleService.isExists(rule_uuid)
    if (!isExists)
      throw new NotFoundException(
        this.i18n.t('errors.rule_not_found', { lang: I18nContext.current().lang }),
      )

    const result = await this.ruleService.delete(rule_uuid)
    await this.clearCache()
    return result
  }

  async clearCache() {
    const keys = await this.cacheManager.store.keys(`${CacheRoutes.RULE}*`) // Удаление кэша
    for (const key of keys) {
      await this.cacheManager.del(key)
    }
  }
}
