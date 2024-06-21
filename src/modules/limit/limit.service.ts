import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common'
import { Limit } from './entities/limit.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { I18nContext, I18nService } from 'nestjs-i18n'
import { Repository, DataSource } from 'typeorm'
import { CreateLimitDto, UpdateLimitDto } from './dto'
import { ArrayLimitResponse, StatusLimitResponse } from './response'
import { LimitFilter } from './filters'
import { DefaultPagination, LimitStatusesEnum } from 'src/common/constants/constants'
import { formatFilter } from 'src/utils/format-filter'
import { CreateLimitEventDto } from '../limit-event/dto'
import { LimitEvent } from '../limit-event/entities/limit-event.entity'
import { LimitValue } from './entities/limit-value.entity'

@Injectable()
export class LimitService {
  constructor(
    @InjectRepository(Limit)
    private limitRepository: Repository<Limit>,
    private readonly dataSource: DataSource,
    private readonly i18n: I18nService,
  ) {}

  async create(limit: CreateLimitDto): Promise<StatusLimitResponse> {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      const newLimit = await queryRunner.manager
        .getRepository(Limit)
        .createQueryBuilder()
        .useTransaction(true)
        .insert()
        .values({
          ...limit,
          limit_status_id: LimitStatusesEnum.CREATED,
        })
        .returning('*')
        .execute()

      if (newLimit?.raw[0]?.limit_uuid) {
        const limitUuid = newLimit.raw[0].limit_uuid

        for (const year of limit.years) {
          year.limit_uuid = limitUuid
        }

        await queryRunner.manager
          .getRepository(LimitValue)
          .createQueryBuilder()
          .useTransaction(true)
          .insert()
          .values(limit.years)
          .returning('*')
          .execute()

        await queryRunner.commitTransaction()
        return { status: true, data: newLimit.raw[0] }
      } else {
        throw new InternalServerErrorException(newLimit)
      }
    } catch (error) {
      console.log(error)
      await queryRunner.rollbackTransaction()
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    } finally {
      await queryRunner.release()
    }
  }

  async findAll(limitFilter: LimitFilter): Promise<ArrayLimitResponse> {
    try {
      const count = limitFilter?.offset?.count ?? DefaultPagination.COUNT
      const page = limitFilter?.offset?.page ?? DefaultPagination.PAGE
      const filters = formatFilter(limitFilter?.filter ?? {})

      const limits = await this.limitRepository.findAndCount({
        relations: { limit_status: true, branch: true, years: { currency: true } },
        where: filters,
        order: limitFilter.sorts,
        skip: count * (page - 1),
        take: count,
      })

      return { count: limits[1], data: limits[0] }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async isExists(limit_uuid: string): Promise<boolean> {
    try {
      const isExists = await this.limitRepository
        .createQueryBuilder()
        .select()
        .where({ limit_uuid })
        .getExists()

      return isExists
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(limit: UpdateLimitDto, user_uuid: string): Promise<StatusLimitResponse> {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const limitYears = limit.years
      delete limit['years']
      const keys = Object.keys(limit).map((key) => `"${key}"`)
      const oldLimit = await queryRunner.manager
        .getRepository(Limit)
        .createQueryBuilder()
        .select()
        .where({ limit_uuid: limit.limit_uuid })
        .getOne()

      for (const key of keys) {
        if (limit[key] != oldLimit[key]) {
          const event = new CreateLimitEventDto()
          event.limit_event_name = this.i18n.t(`fields.update.${key}`, {
            lang: I18nContext.current().lang,
          })
          event.old_value = oldLimit[key]
          event.new_value = limit[key]
          event.limit_uuid = limit.limit_uuid
          event.user_uuid = user_uuid

          await queryRunner.manager
            .getRepository(LimitEvent)
            .createQueryBuilder()
            .useTransaction(true)
            .insert()
            .values({
              ...event,
            })
            .execute()
        }
      }

      const updateLimit = await queryRunner.manager
        .getRepository(Limit)
        .createQueryBuilder()
        .useTransaction(true)
        .update()
        .where({ limit_uuid: limit.limit_uuid })
        .set({
          ...limit,
        })
        .execute()

      if (limitYears) {
        await queryRunner.manager
          .getRepository(LimitValue)
          .createQueryBuilder()
          .useTransaction(true)
          .delete()
          .where({ limit_uuid: limit.limit_uuid })
          .execute()

        for (const year of limitYears) {
          year.limit_uuid = limit.limit_uuid
        }

        await queryRunner.manager
          .getRepository(LimitValue)
          .createQueryBuilder()
          .useTransaction(true)
          .insert()
          .values(limitYears)
          .returning('*')
          .execute()
      }

      await queryRunner.commitTransaction()
      return { status: updateLimit.affected !== 0 }
    } catch (error) {
      console.log(error)

      await queryRunner.rollbackTransaction()
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    } finally {
      await queryRunner.release()
    }
  }

  async delete(limit_uuid: string): Promise<StatusLimitResponse> {
    try {
      const deleteLimit = await this.limitRepository
        .createQueryBuilder()
        .delete()
        .where({ limit_uuid })
        .execute()

      return { status: deleteLimit.affected !== 0 }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
