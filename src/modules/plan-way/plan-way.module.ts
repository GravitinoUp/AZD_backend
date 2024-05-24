import { Module } from '@nestjs/common'
import { PlanWayService } from './plan-way.service'
import { PlanWayResolver } from './plan-way.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PlanWay } from './entities/plan-way.entity'
import { UserModule } from '../user/user.module'

@Module({
  imports: [TypeOrmModule.forFeature([PlanWay]), UserModule],
  providers: [PlanWayService, PlanWayResolver],
  exports: [PlanWayService],
})
export class PlanWayModule {}
