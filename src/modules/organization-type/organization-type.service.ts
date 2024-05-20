import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { OrganizationType } from './entities/organization-type.entity'
import { OrganizationTypeFilter } from './filters'
import { ArrayOrganizationTypeResponse } from './response'
import { InjectRepository } from '@nestjs/typeorm'
import { DefaultPagination } from 'src/common/constants/constants'
import { Repository } from 'typeorm'

@Injectable()
export class OrganizationTypeService {
  constructor(
    @InjectRepository(OrganizationType)
    private organizationTypeRepository: Repository<OrganizationType>,
  ) {}

  async findAll(typeFilter: OrganizationTypeFilter): Promise<ArrayOrganizationTypeResponse> {
    try {
      const count = typeFilter?.offset?.count ?? DefaultPagination.COUNT
      const page = typeFilter?.offset?.page ?? DefaultPagination.PAGE

      const types = await this.organizationTypeRepository
        .createQueryBuilder()
        .select()
        .where(typeFilter?.filter ?? '')
        .orderBy({ ...typeFilter.sorts })
        .offset(count * (page - 1))
        .limit(count)
        .getManyAndCount()

      return { count: types[1], data: types[0] }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async isExists(organization_type_id: number): Promise<boolean> {
    try {
      const isOrganizationTypeExists = await this.organizationTypeRepository
        .createQueryBuilder()
        .select()
        .where({ organization_type_id })
        .getExists()

      return isOrganizationTypeExists
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
