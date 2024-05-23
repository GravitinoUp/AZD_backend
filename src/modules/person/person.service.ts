import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Person } from './entities/person.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) {}

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
