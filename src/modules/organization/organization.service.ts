import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Organization } from './entities/organization.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateOrganizationDto, UpdateOrganizationDto } from './dto'
import { ArrayOrganizationResponse, StatusOrganizationResponse } from './response'
import { OrganizationFilter } from './filters'
import { DefaultPagination } from 'src/common/constants/constants'
import { formatFilter } from 'src/utils/format-filter'

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
  ) {}

  async create(organization: CreateOrganizationDto): Promise<StatusOrganizationResponse> {
    try {
      const newRole = await this.organizationRepository
        .createQueryBuilder()
        .insert()
        .values({
          ...organization,
        })
        .returning('*')
        .execute()

      return { status: true, data: newRole.raw[0] }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll(organizationFilter: OrganizationFilter): Promise<ArrayOrganizationResponse> {
    try {
      const count = organizationFilter?.offset?.count ?? DefaultPagination.COUNT
      const page = organizationFilter?.offset?.page ?? DefaultPagination.PAGE
      const filters = formatFilter(organizationFilter?.filter ?? {})

      const organizations = await this.organizationRepository.findAndCount({
        relations: { organization_type: true },
        where: filters,
        order: organizationFilter.sorts,
        skip: count * (page - 1),
        take: count,
      })

      return { count: organizations[1], data: organizations[0] }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async isExists(organization_id: string): Promise<boolean> {
    try {
      const isOrganizationExists = await this.organizationRepository
        .createQueryBuilder()
        .select()
        .where({ organization_id })
        .getExists()

      return isOrganizationExists
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(organization: UpdateOrganizationDto): Promise<StatusOrganizationResponse> {
    try {
      const updateRole = await this.organizationRepository
        .createQueryBuilder()
        .update()
        .where({ organization_uuid: organization.organization_uuid })
        .set({
          ...organization,
        })
        .execute()

      return { status: updateRole.affected !== 0 }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async delete(organization_uuid: string): Promise<StatusOrganizationResponse> {
    try {
      const updateRole = await this.organizationRepository
        .createQueryBuilder()
        .delete()
        .where({ organization_uuid })
        .execute()

      return { status: updateRole.affected !== 0 }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
