import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Plan } from './entities/plan.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { CreatePlanDto, UpdatePlanDto } from './dto'
import { ArrayPlanResponse, StatusPlanResponse } from './response'
import { DefaultPagination } from 'src/common/constants/constants'
import { PlanFilter } from './filter'
import { formatFilter } from 'src/utils/format-filter'
import { RolePermissionService } from '../role-permission/role-permission.service'
import { I18nService } from 'nestjs-i18n'
import { PlanEvent } from '../plan-event/entities/plan-event.entity'
import { CreatePlanEventDto } from '../plan-event/dto'

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(Plan)
    private planRepository: Repository<Plan>,
    private readonly rolesPermissionsService: RolePermissionService,
    private readonly dataSource: DataSource,
    private readonly i18n: I18nService,
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

      const plans = await this.planRepository.findAndCount({
        relations: { purchase: true, branch: true, user: { person: true } },
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
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      for (const key of Object.keys(plan)) {
        if (key == 'plan_uuid') continue

        const isHasPermission = await this.rolesPermissionsService.checkPermission(`plan.${key}`, user_uuid)
        if (!isHasPermission) {
          throw new ForbiddenException(`${this.i18n.t('errors.cannot_change_field')} (${key})`)
        }
      }

      const oldPlan = await queryRunner.manager
        .getRepository(Plan)
        .createQueryBuilder('plan')
        .useTransaction(true)
        .select(Object.keys(plan).map((key) => `plan.${key}`))
        .where({ plan_uuid: plan.plan_uuid })
        .getOne()

      for (const key of Object.keys(plan)) {
        if (plan[key] != oldPlan[key]) {
          const event = new CreatePlanEventDto()
          event.plan_event_name = this.i18n.t(`fields.update.${key}`)
          event.old_value = oldPlan[key]
          event.new_value = plan[key]
          event.plan_uuid = plan.plan_uuid
          event.user_uuid = user_uuid

          await queryRunner.manager
            .getRepository(PlanEvent)
            .createQueryBuilder()
            .useTransaction(true)
            .insert()
            .values({
              ...event,
            })
            .execute()
        }
      }

      const updatePlan = await queryRunner.manager
        .getRepository(Plan)
        .createQueryBuilder()
        .useTransaction(true)
        .update()
        .where({ plan_uuid: plan.plan_uuid })
        .set({
          ...plan,
        })
        .execute()

      await queryRunner.commitTransaction()
      return { status: updatePlan.affected !== 0 }
    } catch (error) {
      console.log(error)

      await queryRunner.rollbackTransaction()
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    } finally {
      await queryRunner.release()
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
