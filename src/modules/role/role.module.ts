import { Module } from '@nestjs/common'
import { RoleService } from './role.service'
import { RoleController } from './role.controller'
import { UserModule } from '../user/user.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Role } from './entities/role.entity'
import { RolePermissionModule } from '../role-permission/role-permission.module'
import { PermissionModule } from '../permission/permission.module'
import { PropertiesModule } from '../properties/properties.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]),
    UserModule,
    PermissionModule,
    RolePermissionModule,
    PropertiesModule,
  ],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
