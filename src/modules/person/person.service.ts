import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Person } from './entities/person.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { IsNull, Repository } from 'typeorm'
import { PersonFilter } from './filters'
import { formatFilter } from 'src/utils/format-filter'
import { DefaultPagination } from 'src/common/constants/constants'
import { ArrayPersonResponse } from './response'

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) {}

  async findAll(personFilter: PersonFilter): Promise<ArrayPersonResponse> {
    try {
      const count = personFilter?.offset?.count ?? DefaultPagination.COUNT
      const page = personFilter?.offset?.page ?? DefaultPagination.PAGE
      const filters = formatFilter(personFilter?.filter ?? {})

      const persons = await this.personRepository.findAndCount({
        relations: { legal_basis: true, user: true },
        where: { ...filters, user: { user_uuid: IsNull() } },
        order: personFilter.sorts,
        skip: count * (page - 1),
        take: count,
      })

      return { count: persons[1], data: persons[0] }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async isExists(person_uuid: string): Promise<boolean> {
    try {
      const isPersonExists = await this.personRepository
        .createQueryBuilder()
        .select()
        .where({ person_uuid })
        .getExists()

      return isPersonExists
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
