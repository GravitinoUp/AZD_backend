import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common'
import { Kosgu } from './entities/kosgu.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { DefaultPagination } from 'src/common/constants/constants'
import { DataSource, QueryRunner, Repository } from 'typeorm'
import { KosguFilter } from './filters'
import { ArrayKosguResponse, KosguResponse } from './response'
import { formatFilter } from 'src/utils/format-filter'

@Injectable()
export class KosguService {
  constructor(
    @InjectRepository(Kosgu)
    private kosguRepository: Repository<Kosgu>,
    private readonly dataSource: DataSource,
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
      const isExists = await this.kosguRepository
        .createQueryBuilder()
        .select()
        .where({ kosgu_uuid })
        .getExists()

      return isExists
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findOrCreateKosgu(kosgu_code: string, qRunner: QueryRunner): Promise<KosguResponse> {
    const queryRunner = qRunner ?? this.dataSource.createQueryRunner()
    if (!qRunner) {
      await queryRunner.connect()
      await queryRunner.startTransaction()
    }

    try {
      const kosgu = await queryRunner.manager
        .getRepository(Kosgu)
        .createQueryBuilder()
        .useTransaction(true)
        .select()
        .where({ kosgu_code })
        .getOne()

      if (kosgu) {
        return kosgu
      } else {
        const newKosgu = await queryRunner.manager
          .getRepository(Kosgu)
          .createQueryBuilder()
          .useTransaction(true)
          .insert()
          .values({ kosgu_code })
          .returning('*')
          .execute()

        if (newKosgu.raw[0]) {
          if (!qRunner) await queryRunner.commitTransaction()
          return newKosgu.raw[0]
        } else {
          throw new InternalServerErrorException('ERROR CREATE KOSGU')
        }
      }
    } catch (error) {
      console.log(error)
      if (!qRunner) await queryRunner.rollbackTransaction()
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    } finally {
      if (!qRunner) await queryRunner.release()
    }
  }
}
