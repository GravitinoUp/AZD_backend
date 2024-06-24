import { Module } from '@nestjs/common'
import { AgreementService } from './agreement.service'
import { AgreementController } from './agreement.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Agreement } from './entities/agreement.entity'
import { RoleAgreement } from '../role-agreement/entities/role-agreement.entity'
import { UserModule } from '../user/user.module'
import { RolePermissionModule } from '../role-permission/role-permission.module'
import { User } from '../user/entities/user.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Agreement, RoleAgreement, User]),
    UserModule,
    RolePermissionModule,
  ],
  controllers: [AgreementController],
  providers: [AgreementService],
  exports: [AgreementService],
})
export class AgreementModule {}
