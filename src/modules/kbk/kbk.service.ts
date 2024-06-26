import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common'
import { KBK } from './entities/kbk.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, QueryRunner, Repository } from 'typeorm'
import { KBKValue } from './entities/kbk-value.entity'
import { DefaultPagination, KbkValueTypesEnum } from 'src/common/constants/constants'
import { formatFilter } from 'src/utils/format-filter'
import { KBKFilter } from './filters'
import {
  ArrayKBKResponse,
  ArrayKBKValueResponse,
  KBKResponse,
  StatusKBKValueResponse,
} from './response'
import { CreateKBKValueDto } from './dto'
import { KBKType } from './entities/kbk-type.entity'
import { KBKLimitDto, KBKValuesDto } from '../limit/dto'

@Injectable()
export class KbkService {
  constructor(
    @InjectRepository(KBK)
    private kbkRepository: Repository<KBK>,
    @InjectRepository(KBKValue)
    private kbkValueRepository: Repository<KBKValue>,
    @InjectRepository(KBKType)
    private kbkTypeRepository: Repository<KBKType>,
    private readonly dataSource: DataSource,
  ) {}

  async createValue(value: CreateKBKValueDto): Promise<StatusKBKValueResponse> {
    try {
      const newValue = await this.kbkValueRepository
        .createQueryBuilder()
        .insert()
        .values({
          ...value,
        })
        .returning('*')
        .execute()

      return { status: true, data: newValue.raw[0] }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAllKBK(kbkFilter: KBKFilter): Promise<ArrayKBKResponse> {
    try {
      const count = kbkFilter?.offset?.count ?? DefaultPagination.COUNT
      const page = kbkFilter?.offset?.page ?? DefaultPagination.PAGE
      const filters = formatFilter(kbkFilter?.filter ?? {})

      const data = await this.kbkRepository.findAndCount({
        relations: {
          kbk_section: true,
          kbk_subsection: true,
          kbk_target_article: true,
          kbk_expenses_type: true,
        },
        where: filters,
        order: kbkFilter.sorts,
        skip: count * (page - 1),
        take: count,
      })

      return { count: data[1], data: data[0] }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findValuesByType(kbk_type_id: number): Promise<ArrayKBKValueResponse> {
    try {
      const data = await this.kbkValueRepository.findAndCount({
        relations: {
          kbk_type: true,
        },
        where: { kbk_type_id },
      })

      return { count: data[1], data: data[0] }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async isExists(kbk_uuid: string): Promise<boolean> {
    try {
      const isExists = await this.kbkRepository
        .createQueryBuilder()
        .select()
        .where({ kbk_uuid })
        .getExists()

      return isExists
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findOrCreateKBK(kbkValues: KBKLimitDto, qRunner: QueryRunner): Promise<KBKResponse> {
    const queryRunner = qRunner ?? this.dataSource.createQueryRunner()
    if (!qRunner) {
      await queryRunner.connect()
      await queryRunner.startTransaction()
    }

    try {
      const kbkValueUuids = new KBKValuesDto()
      for (const key of Object.keys(kbkValues)) {
        const value: string = kbkValues[key]

        const kbkValue = await queryRunner.manager
          .getRepository(KBKValue)
          .createQueryBuilder('value')
          .useTransaction(true)
          .select('value.kbk_value_uuid')
          .where({ kbk_value: value, kbk_type_id: KbkValueTypesEnum[key] })
          .getOne()

        if (kbkValue) {
          kbkValueUuids[`${key}_uuid`] = kbkValue.kbk_value_uuid
        } else {
          const newKbkValue = await queryRunner.manager
            .getRepository(KBKValue)
            .createQueryBuilder()
            .useTransaction(true)
            .insert()
            .values({ kbk_value: value, kbk_type_id: KbkValueTypesEnum[key] })
            .returning('*')
            .execute()

          if (newKbkValue) {
            kbkValueUuids[`${key}_uuid`] = newKbkValue.raw[0].kbk_value_uuid
          } else {
            throw new InternalServerErrorException(newKbkValue)
          }
        }
      }

      const kbk = await queryRunner.manager
        .getRepository(KBK)
        .createQueryBuilder()
        .useTransaction(true)
        .select()
        .where({ ...kbkValueUuids })
        .getOne()

      if (kbk) {
        return kbk
      } else {
        const newKbk = await queryRunner.manager
          .getRepository(KBK)
          .createQueryBuilder()
          .useTransaction(true)
          .insert()
          .values({ ...kbkValueUuids })
          .returning('*')
          .execute()

        if (newKbk.raw[0]) {
          if (!qRunner) await queryRunner.commitTransaction()
          return newKbk.raw[0]
        } else {
          throw new InternalServerErrorException('ERROR CREATE KBK')
        }
      }
    } catch (error) {
      console.log(error)
      if (!qRunner) await queryRunner.rollbackTransaction()
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    } finally {
      if (!qRunner) await queryRunner.release()
    }
  }

  async isTypeExists(kbk_type_id: number): Promise<boolean> {
    try {
      const isExists = await this.kbkTypeRepository
        .createQueryBuilder()
        .select()
        .where({ kbk_type_id })
        .getExists()

      return isExists
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
