import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DefaultPagination } from 'src/common/constants/constants'
import { formatFilter } from 'src/utils/format-filter'
import { Repository } from 'typeorm'
import { Okei } from './entities/okei.entity'
import { OkeiFilter } from './filters'
import { ArrayOkeiResponse } from './response'

@Injectable()
export class OkeiService {
  constructor(
    @InjectRepository(Okei)
    private okeiRepository: Repository<Okei>,
  ) {}

  async findAll(okeiFilter: OkeiFilter): Promise<ArrayOkeiResponse> {
    try {
      const count = okeiFilter?.offset?.count ?? DefaultPagination.COUNT
      const page = okeiFilter?.offset?.page ?? DefaultPagination.PAGE
      const filters = formatFilter(okeiFilter?.filter ?? {})

      const okeiList = await this.okeiRepository.findAndCount({
        where: filters,
        order: okeiFilter.sorts,
        skip: count * (page - 1),
        take: count,
      })

      return { count: okeiList[1], data: okeiList[0] }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async isExists(okei_uuid: string): Promise<boolean> {
    try {
      const isOkeiExists = await this.okeiRepository
        .createQueryBuilder()
        .select()
        .where({ okei_uuid })
        .getExists()

      return isOkeiExists
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
