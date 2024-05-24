import { Module } from '@nestjs/common'
import { PlanService } from './plan.service'
import { PlanResolver } from './plan.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Plan } from './entities/plan.entity'
import { UserModule } from '../user/user.module'
import { PlanWayModule } from '../plan-way/plan-way.module'
import { OrganizationModule } from '../organization/organization.module'
import { RolePermissionModule } from '../role-permission/role-permission.module'

@Module({
  imports: [TypeOrmModule.forFeature([Plan]), UserModule, PlanWayModule, OrganizationModule, RolePermissionModule],
  providers: [PlanService, PlanResolver],
  exports: [PlanService],
})
export class PlanModule {}
