import { Module } from '@nestjs/common'
import { LimitEventService } from './limit-event.service'
import { LimitEventController } from './limit-event.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LimitEvent } from './entities/limit-event.entity'
import { UserModule } from '../user/user.module'

@Module({
  imports: [TypeOrmModule.forFeature([LimitEvent]), UserModule],
  controllers: [LimitEventController],
  providers: [LimitEventService],
})
export class LimitEventModule {}
