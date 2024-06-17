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
import { ProductService } from './product.service'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBody,
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger'
import { I18nService } from 'nestjs-i18n'
import { CacheRoutes } from 'src/common/constants/constants'
import { AppStrings } from 'src/common/constants/strings'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { PermissionsGuard } from '../role-permission/guards/permission.guard'
import { CreateProductDto, UpdateProductDto } from './dto'
import { ProductFilter } from './filters'
import { StatusProductResponse, ArrayProductResponse } from './response'
import { AllExceptionsFilter } from 'src/common/exception.filter'

@ApiBearerAuth()
@ApiTags('Product')
@Controller('product')
@UseFilters(AllExceptionsFilter)
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.ProductCreate])
  @ApiOperation({ summary: AppStrings.PRODUCT_CREATE_OPERATION })
  @ApiCreatedResponse({
    description: AppStrings.PRODUCT_CREATED_RESPONSE,
    type: StatusProductResponse,
  })
  @Post()
  async create(@Body() product: CreateProductDto) {
    // TODO Okei
    const result = await this.productService.create(product)
    await this.clearCache()
    return result
  }

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.ProductGet])
  @ApiOperation({ summary: AppStrings.PRODUCT_ALL_OPERATION })
  @ApiOkResponse({
    description: AppStrings.PRODUCT_ALL_RESPONSE,
    type: ArrayProductResponse,
  })
  @ApiBody({ required: false, type: ProductFilter })
  @Post('all')
  async findAll(@Body() productFilter: ProductFilter) {
    const key = `${CacheRoutes.PRODUCT}/all-${JSON.stringify(productFilter)}`
    let products: ArrayProductResponse = await this.cacheManager.get(key)

    if (products) {
      return products
    } else {
      products = await this.productService.findAll(productFilter)
      await this.cacheManager.set(key, products)
      return products
    }
  }

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.ProductGet])
  @ApiOperation({ summary: AppStrings.PRODUCT_ALL_OPERATION })
  @ApiOkResponse({
    description: AppStrings.PRODUCT_ALL_RESPONSE,
    type: ArrayProductResponse,
  })
  @Get('all')
  async getAll() {
    const key = `${CacheRoutes.PRODUCT}/all-{}`
    let products: ArrayProductResponse = await this.cacheManager.get(key)

    if (products) {
      return products
    } else {
      products = await this.productService.findAll({})
      await this.cacheManager.set(key, products)
      return products
    }
  }

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.ProductUpdate])
  @ApiOperation({ summary: AppStrings.PRODUCT_UPDATE_OPERATION })
  @ApiOkResponse({
    description: AppStrings.PRODUCT_UPDATE_RESPONSE,
    type: StatusProductResponse,
  })
  @Patch()
  async update(@Body() product: UpdateProductDto) {
    const isExists = await this.productService.isExists(product.product_uuid)
    if (!isExists) throw new NotFoundException(this.i18n.t('errors.product_not_found'))

    const result = await this.productService.update(product)
    await this.clearCache()
    return result
  }

  @UseGuards(JwtAuthGuard, ActiveGuard, PermissionsGuard)
  // @HasPermissions([PermissionEnum.ProductDelete])
  @ApiOperation({ summary: AppStrings.PRODUCT_DELETE_OPERATION })
  @ApiOkResponse({
    description: AppStrings.PRODUCT_DELETE_RESPONSE,
    type: StatusProductResponse,
  })
  @Delete(':uuid')
  async delete(@Param('uuid') product_uuid: string) {
    const isExists = await this.productService.isExists(product_uuid)
    if (!isExists) throw new NotFoundException(this.i18n.t('errors.product_not_found'))

    const result = await this.productService.delete(product_uuid)
    await this.clearCache()
    return result
  }

  async clearCache() {
    const keys = await this.cacheManager.store.keys(`${CacheRoutes.PRODUCT}*`) // Удаление кэша
    for (const key of keys) {
      await this.cacheManager.del(key)
    }
  }
}
