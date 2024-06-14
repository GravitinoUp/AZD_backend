import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { KBK } from './entities/kbk.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { KBKValue } from './entities/kbk-value.entity'
import { DefaultPagination } from 'src/common/constants/constants'
import { formatFilter } from 'src/utils/format-filter'
import { KBKFilter } from './filters'
import { ArrayKBKResponse } from './response'

@Injectable()
export class KbkService {
  constructor(
    @InjectRepository(KBK)
    private kbkRepository: Repository<KBK>,
    @InjectRepository(KBKValue)
    private kbkValueRepository: Repository<KBKValue>,
  ) {}

  async findAllKBK(kbkFilter: KBKFilter): Promise<ArrayKBKResponse> {
    try {
      const count = kbkFilter?.offset?.count ?? DefaultPagination.COUNT
      const page = kbkFilter?.offset?.page ?? DefaultPagination.PAGE
      const filters = formatFilter(kbkFilter?.filter ?? {})

      const data = await this.kbkRepository.findAndCount({
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
}
