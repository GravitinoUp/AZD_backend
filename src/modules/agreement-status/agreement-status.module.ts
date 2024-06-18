import { Module } from '@nestjs/common'
import { AgreementStatusService } from './agreement-status.service'
import { AgreementStatusController } from './agreement-status.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AgreementStatus } from './entities/agreement-status.entity'
import { UserModule } from '../user/user.module'
import { RolePermissionModule } from '../role-permission/role-permission.module'
import { EntityModule } from '../entity/entity.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([AgreementStatus]),
    UserModule,
    RolePermissionModule,
    EntityModule,
  ],
  controllers: [AgreementStatusController],
  providers: [AgreementStatusService],
  exports: [AgreementStatusService],
})
export class AgreementStatusModule {}
