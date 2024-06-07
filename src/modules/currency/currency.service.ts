import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Currency } from './entities/currency.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CurrencyFilter } from './filters'
import { ArrayCurrencyResponse } from './response'
import { DefaultPagination } from 'src/common/constants/constants'
import { formatFilter } from 'src/utils/format-filter'

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(Currency)
    private currencyRepository: Repository<Currency>,
  ) {}

  async findAll(currencyFilter: CurrencyFilter): Promise<ArrayCurrencyResponse> {
    try {
      const count = currencyFilter?.offset?.count ?? DefaultPagination.COUNT
      const page = currencyFilter?.offset?.page ?? DefaultPagination.PAGE
      const filters = formatFilter(currencyFilter?.filter ?? {})

      const data = await this.currencyRepository.findAndCount({
        where: filters,
        order: currencyFilter.sorts,
        skip: count * (page - 1),
        take: count,
      })

      return { count: data[1], data: data[0] }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async isExists(currency_code: string): Promise<boolean> {
    try {
      const isExists = await this.currencyRepository.createQueryBuilder().select().where({ currency_code }).getExists()

      return isExists
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
