import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DefaultPagination } from 'src/common/constants/constants'
import { formatFilter } from 'src/utils/format-filter'
import { Repository } from 'typeorm'
import { LimitStatus } from './entities/limit-status.entity'
import { LimitStatusFilter } from './filters'
import { ArrayLimitStatusResponse } from './response'

@Injectable()
export class LimitStatusService {
  constructor(
    @InjectRepository(LimitStatus)
    private limitStatusRepository: Repository<LimitStatus>,
  ) {}

  async findAll(limitStatusFilter: LimitStatusFilter): Promise<ArrayLimitStatusResponse> {
    try {
      const count = limitStatusFilter?.offset?.count ?? DefaultPagination.COUNT
      const page = limitStatusFilter?.offset?.page ?? DefaultPagination.PAGE
      const filters = formatFilter(limitStatusFilter?.filter ?? {})

      const statuses = await this.limitStatusRepository.findAndCount({
        where: filters,
        order: limitStatusFilter.sorts,
        skip: count * (page - 1),
        take: count,
      })

      return { count: statuses[1], data: statuses[0] }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async isExists(limit_status_id: string): Promise<boolean> {
    try {
      const isExists = await this.limitStatusRepository
        .createQueryBuilder()
        .select()
        .where({ limit_status_id })
        .getExists()

      return isExists
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
