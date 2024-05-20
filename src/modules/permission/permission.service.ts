import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Permission } from './entities/permission.entity'
import { ArrayPermissionResponse } from './response'

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async findAll(): Promise<ArrayPermissionResponse> {
    try {
      const permissions = await this.permissionRepository
        .createQueryBuilder()
        .select()
        .getManyAndCount()

      return { count: permissions[1], data: permissions[0] }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async isExists(permission_id: string): Promise<boolean> {
    try {
      const isPermissionExists = await this.permissionRepository
        .createQueryBuilder()
        .select()
        .where({ permission_id })
        .getExists()

      return isPermissionExists
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
