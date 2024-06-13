import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DefaultPagination } from 'src/common/constants/constants'
import { formatFilter } from 'src/utils/format-filter'
import { Repository } from 'typeorm'
import { CreatePlanDto } from './dto'
import { Plan } from './entities/plan.entity'
import { PlanFilter } from './filters'
import { StatusPlanResponse, ArrayPlanResponse } from './response'

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(Plan)
    private planRepository: Repository<Plan>,
  ) {}

  async create(plan: CreatePlanDto): Promise<StatusPlanResponse> {
    try {
      const newPlan = await this.planRepository
        .createQueryBuilder()
        .insert()
        .values({
          ...plan,
        })
        .returning('*')
        .execute()

      return { status: true, data: newPlan.raw[0] }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll(planFilter: PlanFilter): Promise<ArrayPlanResponse> {
    try {
      const count = planFilter?.offset?.count ?? DefaultPagination.COUNT
      const page = planFilter?.offset?.page ?? DefaultPagination.PAGE
      const filters = formatFilter(planFilter?.filter ?? {})

      console.log(filters)

      const plans = await this.planRepository.findAndCount({
        relations: { plan_status: true, branch: true },
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

  async isExists(plan_uuid: string): Promise<boolean> {
    try {
      const isPlanExists = await this.planRepository
        .createQueryBuilder()
        .select()
        .where({ plan_uuid })
        .getExists()

      return isPlanExists
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  //   async update(plan: UpdatePlanDto): Promise<StatusPlanResponse> {
  //     try {
  //       const updatePlan = await this.planRepository
  //         .createQueryBuilder()
  //         .update()
  //         .where({ plan_uuid: plan.plan_uuid })
  //         .set({
  //           ...plan,
  //         })
  //         .execute()

  //       return { status: updatePlan.affected !== 0 }
  //     } catch (error) {
  //       throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
  //     }
  //   }

  async delete(plan_uuid: string): Promise<StatusPlanResponse> {
    try {
      const deletePlan = await this.planRepository
        .createQueryBuilder()
        .delete()
        .where({ plan_uuid })
        .execute()

      return { status: deletePlan.affected !== 0 }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
