import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PlanWay } from './entities/plan-way.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { DefaultPagination } from 'src/common/constants/constants'
import { Repository } from 'typeorm'
import { PlanWayFilter } from './filter'
import { ArrayWayResponse } from './response'
import { formatFilter } from 'src/utils/format-filter'

@Injectable()
export class PlanWayService {
  constructor(
    @InjectRepository(PlanWay)
    private planWayRepository: Repository<PlanWay>,
  ) {}

  async findAll(wayFilter: PlanWayFilter): Promise<ArrayWayResponse> {
    try {
      const count = wayFilter?.offset?.count ?? DefaultPagination.COUNT
      const page = wayFilter?.offset?.page ?? DefaultPagination.PAGE
      const filters = formatFilter(wayFilter?.filter ?? {})

      const ways = await this.planWayRepository.findAndCount({
        relations: {},
        where: filters,
        order: wayFilter.sorts,
        skip: count * (page - 1),
        take: count,
      })

      return { count: ways[1], data: ways[0] }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async isExists(way_id: number): Promise<boolean> {
    try {
      const isExists = await this.planWayRepository
        .createQueryBuilder()
        .select()
        .where({ way_id })
        .getExists()

      return isExists
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
