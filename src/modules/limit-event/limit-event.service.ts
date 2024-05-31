import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { I18nService } from 'nestjs-i18n'
import { DefaultPagination } from 'src/common/constants/constants'
import { formatFilter } from 'src/utils/format-filter'
import { Repository } from 'typeorm'
import { LimitEvent } from './entities/limit-event.entity'
import { LimitEventFilter } from './filters'
import { ArrayLimitEventResponse } from './response'

@Injectable()
export class LimitEventService {
  constructor(
    @InjectRepository(LimitEvent)
    private limitEventRepository: Repository<LimitEvent>,
    private readonly i18n: I18nService,
  ) {}

  async findAll(limitEventFilter: LimitEventFilter): Promise<ArrayLimitEventResponse> {
    try {
      const count = limitEventFilter?.offset?.count ?? DefaultPagination.COUNT
      const page = limitEventFilter?.offset?.page ?? DefaultPagination.PAGE
      const filters = formatFilter(limitEventFilter?.filter ?? {})

      const limits = await this.limitEventRepository.findAndCount({
        relations: { user: { person: true, role: true } },
        where: filters,
        order: limitEventFilter.sorts,
        skip: count * (page - 1),
        take: count,
      })

      return { count: limits[1], data: limits[0] }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
