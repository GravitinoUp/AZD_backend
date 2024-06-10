import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Role } from './entities/role.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ArrayRoleResponse, StatusRoleResponse } from './response'
import { CreateRoleDto, UpdateRoleDto } from './dto'
import { RoleFilter } from './filters'
import { DefaultPagination } from 'src/common/constants/constants'
import { formatFilter } from 'src/utils/format-filter'

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async create(role: CreateRoleDto): Promise<StatusRoleResponse> {
    try {
      const newRole = await this.roleRepository
        .createQueryBuilder()
        .insert()
        .values({
          ...role,
        })
        .returning('*')
        .execute()

      return { status: true, data: newRole.raw[0] }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll(roleFilter: RoleFilter): Promise<ArrayRoleResponse> {
    try {
      const count = roleFilter?.offset?.count ?? DefaultPagination.COUNT
      const page = roleFilter?.offset?.page ?? DefaultPagination.PAGE
      const filters = formatFilter(roleFilter?.filter ?? {})

      const roles = await this.roleRepository.findAndCount({
        relations: { role_permissions: true },
        where: filters,
        order: roleFilter.sorts,
        skip: count * (page - 1),
        take: count,
      })

      return { count: roles[1], data: roles[0] }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async isExists(role_id: number): Promise<boolean> {
    try {
      const isRoleExists = await this.roleRepository
        .createQueryBuilder()
        .select()
        .where({ role_id })
        .getExists()

      return isRoleExists
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(role: UpdateRoleDto): Promise<StatusRoleResponse> {
    try {
      const updateRole = await this.roleRepository
        .createQueryBuilder()
        .update()
        .where({ role_id: role.role_id })
        .set({
          ...role,
        })
        .execute()

      return { status: updateRole.affected !== 0 }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
