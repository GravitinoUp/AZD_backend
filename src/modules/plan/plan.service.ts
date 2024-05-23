import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Plan } from './entities/plan.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreatePlanDto, UpdatePlanDto } from './dto'
import { ArrayPlanResponse, StatusPlanResponse } from './response'
import { DefaultPagination } from 'src/common/constants/constants'
import { PlanFilter } from './filter'
import { formatFilter } from 'src/utils/format-filter'
import { RolePermissionService } from '../role-permission/role-permission.service'
import { I18nService } from 'nestjs-i18n'

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(Plan)
    private planRepository: Repository<Plan>,
    private readonly rolesPermissionsService: RolePermissionService,
    private readonly i18n: I18nService,
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

  async isExists(plan_uuid: string): Promise<boolean> {
    try {
      const isExists = await this.planRepository.createQueryBuilder().select().where({ plan_uuid }).getExists()

      return isExists
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(plan: UpdatePlanDto, user_uuid: string): Promise<StatusPlanResponse> {
    try {
      for (const key of Object.keys(plan)) {
        if (key == 'plan_uuid') continue

        const isHasPermission = await this.rolesPermissionsService.checkPermission(`plan.${key}`, user_uuid)
        if (!isHasPermission) {
          throw new ForbiddenException(`${this.i18n.t('errors.cannot_change_field')} (${key})`)
        }
      }

      const updatePlan = await this.planRepository
        .createQueryBuilder()
        .update()
        .where({ plan_uuid: plan.plan_uuid })
        .set({
          ...plan,
        })
        .execute()

      return { status: updatePlan.affected !== 0 }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async delete(plan_uuid: string): Promise<StatusPlanResponse> {
    try {
      const deletePlan = await this.planRepository.createQueryBuilder().delete().where({ plan_uuid }).execute()

      return { status: deletePlan.affected !== 0 }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
