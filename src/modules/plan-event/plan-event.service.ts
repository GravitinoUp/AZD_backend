import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PlanEvent } from './entities/plan-event.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { I18nService } from 'nestjs-i18n'
import { Repository } from 'typeorm'
import { PlanEventFilter } from './filters'
import { ArrayPlanEventResponse } from './response'
import { DefaultPagination } from 'src/common/constants/constants'
import { formatFilter } from 'src/utils/format-filter'

@Injectable()
export class PlanEventService {
  constructor(
    @InjectRepository(PlanEvent)
    private planEventRepository: Repository<PlanEvent>,
    private readonly i18n: I18nService,
  ) {}

  async findAll(planEventFilter: PlanEventFilter): Promise<ArrayPlanEventResponse> {
    try {
      const count = planEventFilter?.offset?.count ?? DefaultPagination.COUNT
      const page = planEventFilter?.offset?.page ?? DefaultPagination.PAGE
      const filters = formatFilter(planEventFilter?.filter ?? {})

      const plans = await this.planEventRepository.findAndCount({
        relations: { user: { person: true, role: true } },
        where: filters,
        order: planEventFilter.sorts,
        skip: count * (page - 1),
        take: count,
      })

      return { count: plans[1], data: plans[0] }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
