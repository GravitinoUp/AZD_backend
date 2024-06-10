import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PlanStatus } from './entities/plan-status.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { DefaultPagination } from 'src/common/constants/constants'
import { formatFilter } from 'src/utils/format-filter'
import { Repository } from 'typeorm'
import { PlanStatusFilter } from './filter'
import { ArrayPlanStatusResponse } from './response'

@Injectable()
export class PlanStatusService {
  constructor(
    @InjectRepository(PlanStatus)
    private planStatusRepository: Repository<PlanStatus>,
  ) {}

  async findAll(statusFilter: PlanStatusFilter): Promise<ArrayPlanStatusResponse> {
    try {
      const count = statusFilter?.offset?.count ?? DefaultPagination.COUNT
      const page = statusFilter?.offset?.page ?? DefaultPagination.PAGE
      const filters = formatFilter(statusFilter?.filter ?? {})

      const statuses = await this.planStatusRepository.findAndCount({
        relations: {},
        where: filters,
        order: statusFilter.sorts,
        skip: count * (page - 1),
        take: count,
      })

      return { count: statuses[1], data: statuses[0] }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async isExists(plan_status_id: number): Promise<boolean> {
    try {
      const isExists = await this.planStatusRepository
        .createQueryBuilder()
        .select()
        .where({ plan_status_id })
        .getExists()

      return isExists
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
