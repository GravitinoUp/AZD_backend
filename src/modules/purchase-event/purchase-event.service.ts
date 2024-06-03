import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { I18nService } from 'nestjs-i18n'
import { DefaultPagination } from 'src/common/constants/constants'
import { formatFilter } from 'src/utils/format-filter'
import { Repository } from 'typeorm'
import { PurchaseEvent } from './entities/purchase-event.entity'
import { PurchaseEventFilter } from './filters'
import { ArrayPurchaseEventResponse } from './response'

@Injectable()
export class PurchaseEventService {
  constructor(
    @InjectRepository(PurchaseEvent)
    private purchaseEventRepository: Repository<PurchaseEvent>,
    private readonly i18n: I18nService,
  ) {}

  async findAll(purchaseEventFilter: PurchaseEventFilter): Promise<ArrayPurchaseEventResponse> {
    try {
      const count = purchaseEventFilter?.offset?.count ?? DefaultPagination.COUNT
      const page = purchaseEventFilter?.offset?.page ?? DefaultPagination.PAGE
      const filters = formatFilter(purchaseEventFilter?.filter ?? {})

      const events = await this.purchaseEventRepository.findAndCount({
        relations: { user: { person: true, role: true } },
        where: filters,
        order: purchaseEventFilter.sorts,
        skip: count * (page - 1),
        take: count,
      })

      return { count: events[1], data: events[0] }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
