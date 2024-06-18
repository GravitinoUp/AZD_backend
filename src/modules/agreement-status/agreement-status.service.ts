import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DefaultPagination } from 'src/common/constants/constants'
import { formatFilter } from 'src/utils/format-filter'
import { Repository } from 'typeorm'
import { CreateAgreementStatusDto, UpdateAgreementStatusDto } from './dto'
import { AgreementStatus } from './entities/agreement-status.entity'
import { AgreementStatusFilter } from './filters'
import { StatusAgreementStatusResponse, ArrayAgreementStatusResponse } from './response'

@Injectable()
export class AgreementStatusService {
  constructor(
    @InjectRepository(AgreementStatus)
    private agreementStatusRepository: Repository<AgreementStatus>,
  ) {}

  async create(agreementStatus: CreateAgreementStatusDto): Promise<StatusAgreementStatusResponse> {
    try {
      const newAgreementStatus = await this.agreementStatusRepository
        .createQueryBuilder()
        .insert()
        .values({
          ...agreementStatus,
        })
        .returning('*')
        .execute()

      return { status: true, data: newAgreementStatus.raw[0] }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll(
    agreementStatusFilter: AgreementStatusFilter,
  ): Promise<ArrayAgreementStatusResponse> {
    try {
      const count = agreementStatusFilter?.offset?.count ?? DefaultPagination.COUNT
      const page = agreementStatusFilter?.offset?.page ?? DefaultPagination.PAGE
      const filters = formatFilter(agreementStatusFilter?.filter ?? {})

      const agreementStatuses = await this.agreementStatusRepository.findAndCount({
        relations: { entity: true },
        where: filters,
        order: agreementStatusFilter.sorts,
        skip: count * (page - 1),
        take: count,
      })

      return { count: agreementStatuses[1], data: agreementStatuses[0] }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async isExists(agreement_status_id: number): Promise<boolean> {
    try {
      const isAgreementStatusExists = await this.agreementStatusRepository
        .createQueryBuilder()
        .select()
        .where({ agreement_status_id })
        .getExists()

      return isAgreementStatusExists
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(agreementStatus: UpdateAgreementStatusDto): Promise<StatusAgreementStatusResponse> {
    try {
      const updateAgreementStatus = await this.agreementStatusRepository
        .createQueryBuilder()
        .update()
        .where({ agreement_status_id: agreementStatus.agreement_status_id })
        .set({
          ...agreementStatus,
        })
        .execute()

      return { status: updateAgreementStatus.affected !== 0 }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async delete(agreement_status_id: number): Promise<StatusAgreementStatusResponse> {
    try {
      const deleteAgreementStatus = await this.agreementStatusRepository
        .createQueryBuilder()
        .delete()
        .where({ agreement_status_id })
        .execute()

      return { status: deleteAgreementStatus.affected !== 0 }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
