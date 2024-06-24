import { Module } from '@nestjs/common'
import { RoleAgreementService } from './role-agreement.service'
import { RoleAgreementController } from './role-agreement.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoleAgreement } from './entities/role-agreement.entity'
import { UserModule } from '../user/user.module'
import { RolePermissionModule } from '../role-permission/role-permission.module'
import { RoleModule } from '../role/role.module'
import { PermissionModule } from '../permission/permission.module'
import { EntityModule } from '../entity/entity.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleAgreement]),
    UserModule,
    RolePermissionModule,
    RoleModule,
    PermissionModule,
    EntityModule,
  ],
  controllers: [RoleAgreementController],
  providers: [RoleAgreementService],
  exports: [RoleAgreementService],
})
export class RoleAgreementModule {}
