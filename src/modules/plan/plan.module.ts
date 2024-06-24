import { Module } from '@nestjs/common'
import { PlanService } from './plan.service'
import { PlanController } from './plan.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Plan } from './entities/plan.entity'
import { UserModule } from '../user/user.module'
import { RolePermissionModule } from '../role-permission/role-permission.module'
import { BranchModule } from '../branch/branch.module'
import { AgreementModule } from '../agreement/agreement.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Plan]),
    UserModule,
    RolePermissionModule,
    BranchModule,
    AgreementModule,
  ],
  controllers: [PlanController],
  providers: [PlanService],
  exports: [PlanService],
})
export class PlanModule {}
