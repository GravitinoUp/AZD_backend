import { Module } from '@nestjs/common'
import { RolePermissionService } from './role-permission.service'
import { RolePermissionController } from './role-permission.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RolePermission } from './entities/role-permission.entity'
import { UserModule } from '../user/user.module'
import { RoleModule } from '../role/role.module'
import { PermissionModule } from '../permission/permission.module'
import { User } from '../user/entities/user.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([RolePermission, User]),
    UserModule,
    RoleModule,
    PermissionModule,
  ],
  controllers: [RolePermissionController],
  providers: [RolePermissionService],
  exports: [RolePermissionService],
})
export class RolePermissionModule {}
