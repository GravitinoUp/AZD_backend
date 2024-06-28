import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Role } from './entities/role.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { ArrayRoleResponse, StatusRoleResponse } from './response'
import { CreateRoleDto, UpdateRoleDto } from './dto'
import { RoleFilter } from './filters'
import { DefaultPagination } from 'src/common/constants/constants'
import { formatFilter } from 'src/utils/format-filter'
import { RolePermissionService } from '../role-permission/role-permission.service'
import { UpdateRolePermissionsDto } from '../role-permission/dto'
import { RolePermission } from '../role-permission/entities/role-permission.entity'
import { PropertiesService } from '../properties/properties.service'

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    private readonly propertyService: PropertiesService,
    private readonly rolePermissionService: RolePermissionService,
    private dataSource: DataSource,
  ) {}

  async create(role: CreateRoleDto): Promise<StatusRoleResponse> {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()

    await queryRunner.startTransaction()
    try {
      const newRole = await queryRunner.manager
        .getRepository(Role)
        .createQueryBuilder()
        .insert()
        .values({
          ...role,
        })
        .returning('*')
        .execute()

      const newRolePermissions = new UpdateRolePermissionsDto()
      newRolePermissions.role_id = newRole.raw[0].role_id
      newRolePermissions.permission_ids = role.permission_ids
      newRolePermissions.rights = true

      await this.rolePermissionService.createRolePermissions(
        queryRunner.manager,
        newRolePermissions,
      )

      await queryRunner.commitTransaction()
      return { status: true, data: newRole.raw[0] }
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    } finally {
      await queryRunner.release()
    }
  }

  async findAll(
    roleFilter: RoleFilter,
    includeProperties: boolean = true,
  ): Promise<ArrayRoleResponse> {
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

      if (includeProperties == true) {
        for (const role of roles[0]) {
          if (role.property_values.length > 0) {
            const properties = await this.propertyService.findByIds(role.property_values)
            role['properties'] = properties
          }
        }
      }
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
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()

    await queryRunner.startTransaction()
    try {
      const updateRole = await this.roleRepository
        .createQueryBuilder()
        .update()
        .where({ role_id: role.role_id })
        .set({
          role_name: role.role_name,
        })
        .execute()

      await queryRunner.manager.delete(RolePermission, { role_id: role.role_id })

      const newRolePermissions = new UpdateRolePermissionsDto()
      newRolePermissions.role_id = role.role_id
      newRolePermissions.permission_ids = role.permission_ids
      newRolePermissions.rights = true

      await this.rolePermissionService.createRolePermissions(
        queryRunner.manager,
        newRolePermissions,
      )

      await queryRunner.commitTransaction()
      return { status: updateRole.affected !== 0 }
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    } finally {
      await queryRunner.release()
    }
  }
}
