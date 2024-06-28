import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DefaultPagination } from 'src/common/constants/constants'
import { formatFilter } from 'src/utils/format-filter'
import { Repository } from 'typeorm'
import { CreateBranchDto, UpdateBranchDto } from './dto'
import { Branch } from './entities/branch.entity'
import { BranchFilter } from './filters'
import { StatusBranchResponse, ArrayBranchResponse } from './response'
import { PropertiesService } from '../properties/properties.service'

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(Branch)
    private branchRepository: Repository<Branch>,
    private readonly propertyService: PropertiesService,
  ) {}

  async create(branch: CreateBranchDto): Promise<StatusBranchResponse> {
    try {
      const newBranch = await this.branchRepository
        .createQueryBuilder()
        .insert()
        .values({
          ...branch,
        })
        .returning('*')
        .execute()

      return { status: true, data: newBranch.raw[0] }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll(
    branchFilter: BranchFilter,
    includeProperties: boolean = true,
  ): Promise<ArrayBranchResponse> {
    try {
      const count = branchFilter?.offset?.count ?? DefaultPagination.COUNT
      const page = branchFilter?.offset?.page ?? DefaultPagination.PAGE
      const filters = formatFilter(branchFilter?.filter ?? {})

      const branches = await this.branchRepository.findAndCount({
        relations: {},
        where: filters,
        order: branchFilter.sorts,
        skip: count * (page - 1),
        take: count,
      })

      if (includeProperties == true) {
        for (const branch of branches[0]) {
          if (branch.property_values.length > 0) {
            const properties = await this.propertyService.findByIds(branch.property_values)
            branch['properties'] = properties
          }
        }
      }

      return { count: branches[1], data: branches[0] }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async isExists(branch_uuid: string): Promise<boolean> {
    try {
      const isBranchExists = await this.branchRepository
        .createQueryBuilder()
        .select()
        .where({ branch_uuid })
        .getExists()

      return isBranchExists
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(branch: UpdateBranchDto): Promise<StatusBranchResponse> {
    try {
      const updateBranch = await this.branchRepository
        .createQueryBuilder()
        .update()
        .where({ branch_uuid: branch.branch_uuid })
        .set({
          ...branch,
        })
        .execute()

      return { status: updateBranch.affected !== 0 }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async delete(branch_uuid: string): Promise<StatusBranchResponse> {
    try {
      const deleteBranch = await this.branchRepository
        .createQueryBuilder()
        .delete()
        .where({ branch_uuid })
        .execute()

      return { status: deleteBranch.affected !== 0 }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
