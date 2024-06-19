import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { DefaultPagination } from 'src/common/constants/constants'
import { formatFilter } from 'src/utils/format-filter'
import { AppEntity } from './entities/app-entity.entity'
import { AppEntityFilter } from './filters'
import { ArrayAppEntityResponse } from './response'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class EntityService {
  constructor(
    @InjectRepository(AppEntity)
    private entityRepository: Repository<AppEntity>,
  ) {}

  async findAll(entityFilter: AppEntityFilter): Promise<ArrayAppEntityResponse> {
    try {
      const count = entityFilter?.offset?.count ?? DefaultPagination.COUNT
      const page = entityFilter?.offset?.page ?? DefaultPagination.PAGE
      const filters = formatFilter(entityFilter?.filter ?? {})

      const entities = await this.entityRepository.findAndCount({
        relations: {},
        where: filters,
        order: entityFilter.sorts,
        skip: count * (page - 1),
        take: count,
      })

      return { count: entities[1], data: entities[0] }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async isExists(entity_id: number): Promise<boolean> {
    try {
      const isAppEntityExists = await this.entityRepository
        .createQueryBuilder()
        .select()
        .where({ entity_id })
        .getExists()

      return isAppEntityExists
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
