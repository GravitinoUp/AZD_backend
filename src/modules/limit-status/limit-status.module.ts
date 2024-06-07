import { Module } from '@nestjs/common'
import { LimitStatusService } from './limit-status.service'
import { LimitStatusController } from './limit-status.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LimitStatus } from './entities/limit-status.entity'
import { UserModule } from '../user/user.module'

@Module({
  imports: [TypeOrmModule.forFeature([LimitStatus]), UserModule],
  controllers: [LimitStatusController],
  providers: [LimitStatusService],
  exports: [LimitStatusService],
})
export class LimitStatusModule {}
