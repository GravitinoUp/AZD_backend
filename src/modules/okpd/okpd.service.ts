import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Okpd } from './entities/okpd.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DefaultPagination } from 'src/common/constants/constants'
import { formatFilter } from 'src/utils/format-filter'
import { OkpdFilter } from './filters'
import { ArrayOkpdResponse } from './response'

@Injectable()
export class OkpdService {
  constructor(
    @InjectRepository(Okpd)
    private okpdRepository: Repository<Okpd>,
  ) {}

  async findAll(okpdFilter: OkpdFilter): Promise<ArrayOkpdResponse> {
    try {
      const count = okpdFilter?.offset?.count ?? DefaultPagination.COUNT
      const page = okpdFilter?.offset?.page ?? DefaultPagination.PAGE
      const filters = formatFilter(okpdFilter?.filter ?? {})

      const okpdList = await this.okpdRepository.findAndCount({
        where: filters,
        order: okpdFilter.sorts,
        skip: count * (page - 1),
        take: count,
      })

      return { count: okpdList[1], data: okpdList[0] }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async isExists(okpd_uuid: string): Promise<boolean> {
    try {
      const isOkpdExists = await this.okpdRepository
        .createQueryBuilder()
        .select()
        .where({ okpd_uuid })
        .getExists()

      return isOkpdExists
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
