import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from '../user/user.module'
import { PlanWayModule } from '../plan-way/plan-way.module'
import { OrganizationModule } from '../organization/organization.module'
import { RolePermissionModule } from '../role-permission/role-permission.module'
import { PropertiesModule } from '../properties/properties.module'
import { PurchaseModule } from '../purchase/purchase.module'
import { PlanPosition } from './entities/plan-position.entity'
import { PlanPositionController } from './plan-position.controller'
import { PlanPositionService } from './plan-position.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([PlanPosition]),
    UserModule,
    PlanWayModule,
    OrganizationModule,
    RolePermissionModule,
    PropertiesModule,
    PurchaseModule,
  ],
  controllers: [PlanPositionController],
  providers: [PlanPositionService],
  exports: [PlanPositionService],
})
export class PlanPositionModule {}
