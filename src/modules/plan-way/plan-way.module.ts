import { Module } from '@nestjs/common'
import { PlanWayService } from './plan-way.service'
import { PlanWayController } from './plan-way.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PlanWay } from './entities/plan-way.entity'

@Module({
  imports: [TypeOrmModule.forFeature([PlanWay])],
  controllers: [PlanWayController],
  providers: [PlanWayService],
  exports: [PlanWayService],
})
export class PlanWayModule {}
