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
  UseFilters,
  UseGuards,
} from '@nestjs/common'
import { TechnicalTaskService } from './technical-task.service'
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
import { AppStrings } from 'src/common/constants/strings'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { CreateTechnicalTaskDto, UpdateTechnicalTaskDto } from './dto'
import { ArrayTechnicalTaskResponse, StatusTechnicalTaskResponse } from './response'
import { PurchaseService } from '../purchase/purchase.service'
import { CacheRoutes } from 'src/common/constants/constants'
import { TechnicalTaskFilter } from './filters'

@ApiBearerAuth()
@ApiTags('Technical Tasks')
@Controller('technical-task')
@UseFilters(AllExceptionsFilter)
export class TechnicalTaskController {
  constructor(
    private readonly technicalTaskService: TechnicalTaskService,
    private readonly purchaseService: PurchaseService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @UseGuards(JwtAuthGuard, ActiveGuard)
  @ApiOperation({ summary: AppStrings.TECHNICAL_TASK_CREATE_OPERATION })
  @ApiCreatedResponse({
    description: AppStrings.TECHNICAL_TASK_CREATE_RESPONSE,
    type: StatusTechnicalTaskResponse,
  })
  @Post()
  async create(@Body() techTask: CreateTechnicalTaskDto) {
    const isPurchaseExists = await this.purchaseService.isExists(techTask.purchase_uuid)
    if (!isPurchaseExists)
      throw new HttpException(
        this.i18n.t('errors.purchase_not_found', { lang: I18nContext.current().lang }),
        HttpStatus.NOT_FOUND,
      )

    const result = await this.technicalTaskService.create(techTask)
    await this.clearCache()
    return result
  }

  @ApiOperation({ summary: AppStrings.TECHNICAL_TASK_ALL_OPERATION })
  @ApiOkResponse({
    description: AppStrings.TECHNICAL_TASK_ALL_RESPONSE,
    type: ArrayTechnicalTaskResponse,
  })
  @ApiBody({ required: false, type: TechnicalTaskFilter })
  @Post('all')
  async findAll(@Body() technicalTaskFilter: TechnicalTaskFilter) {
    const key = `${CacheRoutes.TECHNICAL_TASK}/all-${JSON.stringify(technicalTaskFilter)}`
    let result: ArrayTechnicalTaskResponse = await this.cacheManager.get(key)

    if (result) {
      return result
    } else {
      result = await this.technicalTaskService.findAll(technicalTaskFilter)
      await this.cacheManager.set(key, result)
      return result
    }
  }

  @ApiOperation({ summary: AppStrings.TECHNICAL_TASK_ALL_OPERATION })
  @ApiOkResponse({
    description: AppStrings.TECHNICAL_TASK_ALL_RESPONSE,
    type: ArrayTechnicalTaskResponse,
  })
  @Get(':purchase_uuid')
  async findByPurchase(@Param('purchase_uuid') purchaseUuid: string) {
    const technicalTaskFilter = new TechnicalTaskFilter()
    technicalTaskFilter.filter = {
      purchase_uuid: purchaseUuid,
    }

    const key = `${CacheRoutes.TECHNICAL_TASK}/all-${JSON.stringify(technicalTaskFilter)}`
    let result: ArrayTechnicalTaskResponse = await this.cacheManager.get(key)

    if (result) {
      return result
    } else {
      result = await this.technicalTaskService.findAll(technicalTaskFilter)
      await this.cacheManager.set(key, result)
      return result
    }
  }

  @UseGuards(JwtAuthGuard, ActiveGuard)
  @ApiOperation({ summary: AppStrings.TECHNICAL_TASK_UPDATE_OPERATION })
  @ApiOkResponse({
    description: AppStrings.TECHNICAL_TASK_UPDATE_RESPONSE,
    type: StatusTechnicalTaskResponse,
  })
  @Patch()
  async update(@Body() technicalTask: UpdateTechnicalTaskDto) {
    const isTechnicalTaskExists = await this.technicalTaskService.isExists(
      technicalTask.technical_task_uuid,
    )
    if (!isTechnicalTaskExists)
      throw new HttpException(
        this.i18n.t('errors.technical_task_not_found', { lang: I18nContext.current().lang }),
        HttpStatus.NOT_FOUND,
      )

    const result = await this.technicalTaskService.update(technicalTask)
    await this.clearCache()
    return result
  }

  @UseGuards(JwtAuthGuard, ActiveGuard)
  @ApiOperation({ summary: AppStrings.TECHNICAL_TASK_DELETE_OPERATION })
  @ApiOkResponse({
    description: AppStrings.TECHNICAL_TASK_DELETE_RESPONSE,
    type: StatusTechnicalTaskResponse,
  })
  @Delete(':uuid')
  async delete(@Param('uuid') id: string) {
    const isExists = await this.technicalTaskService.isExists(id)
    if (!isExists) {
      throw new HttpException(
        this.i18n.t('errors.technical_task_not_found', { lang: I18nContext.current().lang }),
        HttpStatus.NOT_FOUND,
      )
    }

    const result = await this.technicalTaskService.delete(id)
    await this.clearCache()
    return result
  }

  async clearCache() {
    const keys = await this.cacheManager.store.keys(`${CacheRoutes.TECHNICAL_TASK}*`) // Удаление кэша
    for (const key of keys) {
      await this.cacheManager.del(key)
    }
  }
}
