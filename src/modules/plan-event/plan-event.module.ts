import { Module } from '@nestjs/common'
import { PlanEventService } from './plan-event.service'
import { PlanEventController } from './plan-event.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PlanEvent } from './entities/plan-event.entity'
import { UserModule } from '../user/user.module'

@Module({
  imports: [TypeOrmModule.forFeature([PlanEvent]), UserModule],
  controllers: [PlanEventController],
  providers: [PlanEventService],
  exports: [PlanEventService],
})
export class PlanEventModule {}
