import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { KBK } from './entities/kbk.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { KBKValue } from './entities/kbk-value.entity'
import { DefaultPagination } from 'src/common/constants/constants'
import { formatFilter } from 'src/utils/format-filter'
import { KBKFilter } from './filters'
import { ArrayKBKResponse, ArrayKBKValueResponse, StatusKBKValueResponse } from './response'
import { CreateKBKValueDto } from './dto'
import { KBKType } from './entities/kbk-type.entity'

@Injectable()
export class KbkService {
  constructor(
    @InjectRepository(KBK)
    private kbkRepository: Repository<KBK>,
    @InjectRepository(KBKValue)
    private kbkValueRepository: Repository<KBKValue>,
    @InjectRepository(KBKType)
    private kbkTypeRepository: Repository<KBKType>,
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
