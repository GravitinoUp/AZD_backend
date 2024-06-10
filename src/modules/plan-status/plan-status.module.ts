import { Module } from '@nestjs/common'
import { PlanStatusService } from './plan-status.service'
import { PlanStatusController } from './plan-status.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PlanStatus } from './entities/plan-status.entity'

@Module({
  imports: [TypeOrmModule.forFeature([PlanStatus])],
  controllers: [PlanStatusController],
  providers: [PlanStatusService],
  exports: [PlanStatusService],
})
export class PlanStatusModule {}
