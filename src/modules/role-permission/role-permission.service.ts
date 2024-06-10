import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { RolePermission } from './entities/role-permission.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { CreateRolesPermissionDto, UpdateRolePermissionDto } from './dto'
import {
  ArrayRolePermissionResponse,
  StatusArrayRolePermissionResponse,
  StatusRolePermissionResponse,
} from './response'
import { User } from '../user/entities/user.entity'
import { RolesEnum } from 'src/common/constants/constants'
import { PermissionService } from '../permission/permission.service'

@Injectable()
export class RolePermissionService {
  constructor(
    @InjectRepository(RolePermission)
    private rolePermissionRepository: Repository<RolePermission>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly permissionService: PermissionService,
    private dataSource: DataSource,
  ) {}

  async create(
    rolePermissionDto: CreateRolesPermissionDto,
  ): Promise<StatusArrayRolePermissionResponse> {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()

    await queryRunner.startTransaction()
    try {
      const result = []
      for (const rolePermission of rolePermissionDto.permission_ids) {
        const newRolePermission = await queryRunner.manager.save(RolePermission, {
          role_id: rolePermissionDto.role_id,
          user_uuid: rolePermissionDto.user_uuid,
          permission_id: rolePermission,
          rights: rolePermissionDto.rights,
        })

        result.push(newRolePermission)
      }

      await queryRunner.commitTransaction()
      return { status: true, data: result }
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    } finally {
      await queryRunner.release()
    }
  }

  async findAll(): Promise<ArrayRolePermissionResponse> {
    try {
      const rolePermissions = await this.rolePermissionRepository
        .createQueryBuilder()
        .select()
        .getManyAndCount()

      return { count: rolePermissions[1], data: rolePermissions[0] }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findMy(user_uuid: string): Promise<ArrayRolePermissionResponse> {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .select('user.role_id')
        .where({ user_uuid })
        .getOne()

      const rolePermissions = await this.rolePermissionRepository
        .createQueryBuilder()
        .select()
        .where({ user_uuid })
        .orWhere({ role_id: user.role_id })
        .getManyAndCount()

      return { count: rolePermissions[1], data: rolePermissions[0] }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async isExists(role_permission_uuid: string): Promise<boolean> {
    try {
      const isRolePermissionExists = await this.rolePermissionRepository
        .createQueryBuilder()
        .select()
        .where({ role_permission_uuid })
        .getExists()

      return isRolePermissionExists
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(rolePermission: UpdateRolePermissionDto): Promise<StatusRolePermissionResponse> {
    try {
      const updateRolePermission = await this.rolePermissionRepository
        .createQueryBuilder()
        .update()
        .where({ role_permission_uuid: rolePermission.role_permission_uuid })
        .set({
          ...rolePermission,
        })
        .execute()

      return { status: updateRolePermission.affected !== 0 }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async delete(role_permission_uuid: string): Promise<StatusRolePermissionResponse> {
    try {
      const updateRolePermission = await this.rolePermissionRepository
        .createQueryBuilder()
        .delete()
        .where({ role_permission_uuid })
        .execute()

      return { status: updateRolePermission.affected !== 0 }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async checkPermission(permission_id: string, user_uuid: string): Promise<boolean> {
    const user = await this.userRepository
      .createQueryBuilder()
      .select()
      .where({ user_uuid })
      .getOne()

    if (!user) {
      return false
    } else if (user.role_id == RolesEnum.ADMIN) {
      return true
    } else {
      const permission = await this.permissionService.isExists(permission_id)
      if (!permission) {
        return false
      }

      const rolePermission = await this.rolePermissionRepository
        .createQueryBuilder()
        .select()
        .where({ permission_id, role_id: user.role_id })
        .getOne()

      const userPermission = await this.rolePermissionRepository
        .createQueryBuilder()
        .select()
        .where({ permission_id, user_uuid })
        .getOne()

      if (!rolePermission || !rolePermission) {
        if (!userPermission || !userPermission.rights) {
          return false
        } else {
          return true
        }
      } else {
        if (!userPermission) {
          return true
        } else if (!userPermission.rights) {
          return false
        } else {
          return true
        }
      }
    }
  }
}
