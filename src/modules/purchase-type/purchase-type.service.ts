import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DefaultPagination } from 'src/common/constants/constants'
import { Repository } from 'typeorm'
import { PurchaseType } from './entities/purchase-type.entity'
import { PurchaseTypeFilter } from './filter'
import { ArrayPurchaseTypeResponse } from './response'
import { formatFilter } from 'src/utils/format-filter'

@Injectable()
export class PurchaseTypeService {
  constructor(
    @InjectRepository(PurchaseType)
    private purchaseTypeRepository: Repository<PurchaseType>,
  ) {}

  async findAll(typeFilter: PurchaseTypeFilter): Promise<ArrayPurchaseTypeResponse> {
    try {
      const count = typeFilter?.offset?.count ?? DefaultPagination.COUNT
      const page = typeFilter?.offset?.page ?? DefaultPagination.PAGE
      const filters = formatFilter(typeFilter?.filter ?? {})

      const limits = await this.purchaseTypeRepository.findAndCount({
        relations: {},
        where: filters,
        order: typeFilter.sorts,
        skip: count * (page - 1),
        take: count,
      })

      return { count: limits[1], data: limits[0] }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async isExists(purchase_type_id: number): Promise<boolean> {
    try {
      const isPurchaseTypeExists = await this.purchaseTypeRepository
        .createQueryBuilder()
        .select()
        .where({ purchase_type_id: purchase_type_id })
        .getExists()

      return isPurchaseTypeExists
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
