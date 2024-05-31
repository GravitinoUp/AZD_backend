import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Currency } from './entities/currency.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CurrencyFilter } from './filters'
import { ArrayCurrencyResponse } from './response'
import { DefaultPagination } from 'src/common/constants/constants'

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

      const types = await this.currencyRepository
        .createQueryBuilder()
        .select()
        .where({ ...currencyFilter.filter })
        .orderBy({ ...currencyFilter.sorts })
        .offset(count * (page - 1))
        .limit(count)
        .getManyAndCount()

      return { count: types[1], data: types[0] }
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
