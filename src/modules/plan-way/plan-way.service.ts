import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PlanWay } from './entities/plan-way.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { DefaultPagination } from 'src/common/constants/constants'
import { Repository } from 'typeorm'
import { PlanWayFilter } from './filter'
import { ArrayWayResponse } from './response'

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

      const ways = await this.planWayRepository
        .createQueryBuilder()
        .where({ ...wayFilter.filter })
        .orderBy({ ...wayFilter.sorts })
        .offset(count * (page - 1))
        .limit(count)
        .getManyAndCount()

      return { count: ways[1], data: ways[0] }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async isExists(way_id: number): Promise<boolean> {
    try {
      const isExists = await this.planWayRepository.createQueryBuilder().select().where({ way_id }).getExists()

      return isExists
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
