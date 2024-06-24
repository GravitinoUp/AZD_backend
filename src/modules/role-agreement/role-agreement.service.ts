import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DefaultPagination } from 'src/common/constants/constants'
import { formatFilter } from 'src/utils/format-filter'
import { Repository } from 'typeorm'
import { CreateRoleAgreementDto, UpdateRoleAgreementDto } from './dto'
import { RoleAgreement } from './entities/role-agreement.entity'
import { StatusRoleAgreementResponse, ArrayRoleAgreementResponse } from './response'
import { RoleAgreementFilter } from './filters'

@Injectable()
export class RoleAgreementService {
  constructor(
    @InjectRepository(RoleAgreement)
    private roleAgreementRepository: Repository<RoleAgreement>,
  ) {}

  async create(roleAgreement: CreateRoleAgreementDto): Promise<StatusRoleAgreementResponse> {
    try {
      const newRoleAgreement = await this.roleAgreementRepository
        .createQueryBuilder()
        .insert()
        .values({
          ...roleAgreement,
        })
        .returning('*')
        .execute()

      return { status: true, data: newRoleAgreement.raw[0] }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll(roleAgreementFilter: RoleAgreementFilter): Promise<ArrayRoleAgreementResponse> {
    try {
      const count = roleAgreementFilter?.offset?.count ?? DefaultPagination.COUNT
      const page = roleAgreementFilter?.offset?.page ?? DefaultPagination.PAGE
      const filters = formatFilter(roleAgreementFilter?.filter ?? {})

      const roleAgreements = await this.roleAgreementRepository.findAndCount({
        relations: { entity: true },
        where: filters,
        order: roleAgreementFilter.sorts,
        skip: count * (page - 1),
        take: count,
      })

      return { count: roleAgreements[1], data: roleAgreements[0] }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async isExists(role_agreement_uuid: string): Promise<boolean> {
    try {
      const isRoleAgreementExists = await this.roleAgreementRepository
        .createQueryBuilder()
        .select()
        .where({ role_agreement_uuid })
        .getExists()

      return isRoleAgreementExists
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(roleAgreement: UpdateRoleAgreementDto): Promise<StatusRoleAgreementResponse> {
    try {
      const updateRoleAgreement = await this.roleAgreementRepository
        .createQueryBuilder()
        .update()
        .where({ role_agreement_uuid: roleAgreement.role_agreement_uuid })
        .set({
          ...roleAgreement,
        })
        .execute()

      return { status: updateRoleAgreement.affected !== 0 }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async delete(role_agreement_uuid: string): Promise<StatusRoleAgreementResponse> {
    try {
      const deleteRoleAgreement = await this.roleAgreementRepository
        .createQueryBuilder()
        .delete()
        .where({ role_agreement_uuid })
        .execute()

      return { status: deleteRoleAgreement.affected !== 0 }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
