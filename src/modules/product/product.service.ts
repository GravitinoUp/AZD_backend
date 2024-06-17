import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DefaultPagination } from 'src/common/constants/constants'
import { formatFilter } from 'src/utils/format-filter'
import { Repository } from 'typeorm'
import { CreateProductDto, UpdateProductDto } from './dto'
import { Product } from './entities/product.entity'
import { ProductFilter } from './filters'
import { StatusProductResponse, ArrayProductResponse } from './response'

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(product: CreateProductDto): Promise<StatusProductResponse> {
    try {
      const newProduct = await this.productRepository
        .createQueryBuilder()
        .insert()
        .values({
          ...product,
        })
        .returning('*')
        .execute()

      return { status: true, data: newProduct.raw[0] }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll(productFilter: ProductFilter): Promise<ArrayProductResponse> {
    try {
      const count = productFilter?.offset?.count ?? DefaultPagination.COUNT
      const page = productFilter?.offset?.page ?? DefaultPagination.PAGE
      const filters = formatFilter(productFilter?.filter ?? {})

      const products = await this.productRepository.findAndCount({
        relations: { okei: true },
        where: filters,
        order: productFilter.sorts,
        skip: count * (page - 1),
        take: count,
      })

      return { count: products[1], data: products[0] }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async isExists(product_uuid: string): Promise<boolean> {
    try {
      const isProductExists = await this.productRepository
        .createQueryBuilder()
        .select()
        .where({ product_uuid })
        .getExists()

      return isProductExists
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(product: UpdateProductDto): Promise<StatusProductResponse> {
    try {
      const updateProduct = await this.productRepository
        .createQueryBuilder()
        .update()
        .where({ product_uuid: product.product_uuid })
        .set({
          ...product,
        })
        .execute()

      return { status: updateProduct.affected !== 0 }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async delete(product_uuid: string): Promise<StatusProductResponse> {
    try {
      const deleteProduct = await this.productRepository
        .createQueryBuilder()
        .delete()
        .where({ product_uuid })
        .execute()

      return { status: deleteProduct.affected !== 0 }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
