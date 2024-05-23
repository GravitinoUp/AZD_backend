import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Plan } from './entities/plan.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreatePlanDto } from './dto'
import { ArrayPlanResponse, StatusPlanResponse } from './response'
import { DefaultPagination } from 'src/common/constants/constants'
import { PlanFilter } from './filter'
import { formatFilter } from 'src/utils/format-filter'

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(Plan)
    private planRepository: Repository<Plan>,
  ) {}

  async create(plan: CreatePlanDto): Promise<StatusPlanResponse> {
    try {
      const newRole = await this.planRepository
        .createQueryBuilder()
        .insert()
        .values({
          ...plan,
        })
        .returning('*')
        .execute()

      return { status: true, data: newRole.raw[0] }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll(planFilter: PlanFilter): Promise<ArrayPlanResponse> {
    try {
      const count = planFilter?.offset?.count ?? DefaultPagination.COUNT
      const page = planFilter?.offset?.page ?? DefaultPagination.PAGE
      const filters = formatFilter(planFilter?.filter ?? {})

      const plans = await this.planRepository.findAndCount({
        relations: { branch: true, user: { person: true } },
        where: filters,
        order: planFilter.sorts,
        skip: count * (page - 1),
        take: count,
      })

      return { count: plans[1], data: plans[0] }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
