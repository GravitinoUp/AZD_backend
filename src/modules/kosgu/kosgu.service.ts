import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Kosgu } from './entities/kosgu.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { DefaultPagination } from 'src/common/constants/constants'
import { Repository } from 'typeorm'
import { KosguFilter } from './filters'
import { ArrayKosguResponse } from './response'
import { formatFilter } from 'src/utils/format-filter'

@Injectable()
export class KosguService {
  constructor(
    @InjectRepository(Kosgu)
    private kosguRepository: Repository<Kosgu>,
  ) {}

  async findAll(kosguFilter: KosguFilter): Promise<ArrayKosguResponse> {
    try {
      const count = kosguFilter?.offset?.count ?? DefaultPagination.COUNT
      const page = kosguFilter?.offset?.page ?? DefaultPagination.PAGE
      const filters = formatFilter(kosguFilter?.filter ?? {})

      const data = await this.kosguRepository.findAndCount({
        where: filters,
        order: kosguFilter.sorts,
        skip: count * (page - 1),
        take: count,
      })

      return { count: data[1], data: data[0] }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async isExists(kosgu_uuid: string): Promise<boolean> {
    try {
      const isExists = await this.kosguRepository.createQueryBuilder().select().where({ kosgu_uuid }).getExists()

      return isExists
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
