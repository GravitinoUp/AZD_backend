import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DefaultPagination } from 'src/common/constants/constants'
import { formatFilter } from 'src/utils/format-filter'
import { Repository } from 'typeorm'
import { PurchaseStep } from './entities/purchase-step.entity'
import { PurchaseStepFilter } from './filter'
import { ArrayPurchaseStepResponse } from './response'

@Injectable()
export class PurchaseStepService {
  constructor(
    @InjectRepository(PurchaseStep)
    private purchaseTypeRepository: Repository<PurchaseStep>,
  ) {}

  async findAll(stepFilter: PurchaseStepFilter): Promise<ArrayPurchaseStepResponse> {
    try {
      const count = stepFilter?.offset?.count ?? DefaultPagination.COUNT
      const page = stepFilter?.offset?.page ?? DefaultPagination.PAGE
      const filters = formatFilter(stepFilter?.filter ?? {})

      const limits = await this.purchaseTypeRepository.findAndCount({
        relations: {},
        where: filters,
        order: stepFilter.sorts,
        skip: count * (page - 1),
        take: count,
      })

      return { count: limits[1], data: limits[0] }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async isExists(purchase_step_id: number): Promise<boolean> {
    try {
      const isPurchaseStepExists = await this.purchaseTypeRepository
        .createQueryBuilder()
        .select()
        .where({ purchase_step_id: purchase_step_id })
        .getExists()

      return isPurchaseStepExists
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
