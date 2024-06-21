import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { DefaultPagination } from 'src/common/constants/constants'
import { formatFilter } from 'src/utils/format-filter'
import { RolePermissionService } from '../role-permission/role-permission.service'
import { I18nContext, I18nService } from 'nestjs-i18n'
import { PlanEvent } from '../plan-event/entities/plan-event.entity'
import { CreatePlanEventDto } from '../plan-event/dto'
import { PropertiesService } from '../properties/properties.service'
import { CreatePlanPositionDto, UpdatePlanPositionDto } from './dto'
import { PlanPosition } from './entities/plan-position.entity'
import { PlanPositionFilter } from './filter'
import { StatusPlanPositionResponse, ArrayPlanPositionResponse } from './response'

@Injectable()
export class PlanPositionService {
  constructor(
    @InjectRepository(PlanPosition)
    private planPositionRepository: Repository<PlanPosition>,
    private readonly rolesPermissionsService: RolePermissionService,
    private readonly propertyService: PropertiesService,
    private readonly dataSource: DataSource,
    private readonly i18n: I18nService,
  ) {}

  async create(planPositions: CreatePlanPositionDto): Promise<StatusPlanPositionResponse> {
    try {
      const newPlanPosition = await this.planPositionRepository
        .createQueryBuilder()
        .insert()
        .values({
          ...planPositions,
        })
        .returning('*')
        .execute()

      return { status: true, data: newPlanPosition.raw[0] }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll(
    planFilter: PlanPositionFilter,
    includeProperties: boolean = true,
  ): Promise<ArrayPlanPositionResponse> {
    try {
      const count = planFilter?.offset?.count ?? DefaultPagination.COUNT
      const page = planFilter?.offset?.page ?? DefaultPagination.PAGE
      const filters = formatFilter(planFilter?.filter ?? {})

      console.log(filters)

      const planPositions = await this.planPositionRepository.findAndCount({
        relations: { purchase: true, plan: true, user: { person: true }, okpd: true },
        where: filters,
        order: planFilter.sorts,
        skip: count * (page - 1),
        take: count,
      })

      if (includeProperties == true) {
        for (const planPosition of planPositions[0]) {
          if (planPosition.property_values.length > 0) {
            const properties = await this.propertyService.findByIds(planPosition.property_values)
            planPosition['properties'] = properties
          }
        }
      }

      return { count: planPositions[1], data: planPositions[0] }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async isExists(plan_position_uuid: string): Promise<boolean> {
    try {
      const isExists = await this.planPositionRepository
        .createQueryBuilder()
        .select()
        .where({ plan_position_uuid })
        .getExists()

      return isExists
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(
    planPosition: UpdatePlanPositionDto,
    user_uuid: string,
  ): Promise<StatusPlanPositionResponse> {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      for (const key of Object.keys(planPosition)) {
        if (key == 'plan_position_uuid') continue

        const isHasPermission = await this.rolesPermissionsService.checkPermission(
          `plan_position.${key}`,
          user_uuid,
        )
        if (!isHasPermission) {
          throw new ForbiddenException(
            `${this.i18n.t('errors.cannot_change_field', { lang: I18nContext.current().lang })} (${key})`,
          )
        }
      }

      const oldPlanPosition = await queryRunner.manager
        .getRepository(PlanPosition)
        .createQueryBuilder('plan_positions')
        .useTransaction(true)
        .select(Object.keys(planPosition).map((key) => `plan_position.${key}`))
        .where({ plan_position_uuid: planPosition.plan_position_uuid })
        .getOne()

      for (const key of Object.keys(planPosition)) {
        if (planPosition[key] != oldPlanPosition[key]) {
          const event = new CreatePlanEventDto()
          event.plan_event_name = this.i18n.t(`fields.update.${key}`, {
            lang: I18nContext.current().lang,
          })
          event.old_value = oldPlanPosition[key]
          event.new_value = planPosition[key]
          event.plan_uuid = planPosition.plan_position_uuid
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

      const updatePlanPosition = await queryRunner.manager
        .getRepository(PlanPosition)
        .createQueryBuilder()
        .useTransaction(true)
        .update()
        .where({ plan_position_uuid: planPosition.plan_position_uuid })
        .set({
          ...planPosition,
        })
        .execute()

      await queryRunner.commitTransaction()
      return { status: updatePlanPosition.affected !== 0 }
    } catch (error) {
      console.log(error)

      await queryRunner.rollbackTransaction()
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    } finally {
      await queryRunner.release()
    }
  }

  async delete(plan_position_uuid: string): Promise<StatusPlanPositionResponse> {
    try {
      const deletePlanPosition = await this.planPositionRepository
        .createQueryBuilder()
        .delete()
        .where({ plan_position_uuid })
        .execute()

      return { status: deletePlanPosition.affected !== 0 }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
