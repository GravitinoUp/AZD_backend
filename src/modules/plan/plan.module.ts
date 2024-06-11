import { Module } from '@nestjs/common'
import { PlanService } from './plan.service'
import { PlanController } from './plan.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Plan } from './entities/plan.entity'
import { UserModule } from '../user/user.module'
import { PlanWayModule } from '../plan-way/plan-way.module'
import { OrganizationModule } from '../organization/organization.module'
import { RolePermissionModule } from '../role-permission/role-permission.module'
import { PropertiesModule } from '../properties/properties.module'
import { PurchaseModule } from '../purchase/purchase.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Plan]),
    UserModule,
    PlanWayModule,
    OrganizationModule,
    RolePermissionModule,
    PropertiesModule,
    PurchaseModule,
  ],
  controllers: [PlanController],
  providers: [PlanService],
  exports: [PlanService],
})
export class PlanModule {}
