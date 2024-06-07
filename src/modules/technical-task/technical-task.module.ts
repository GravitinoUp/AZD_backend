import { Module } from '@nestjs/common'
import { TechnicalTaskService } from './technical-task.service'
import { TechnicalTaskController } from './technical-task.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TechnicalTask } from './entities/technical_task.entity'
import { UserModule } from '../user/user.module'
import { PurchaseModule } from '../purchase/purchase.module'

@Module({
  imports: [TypeOrmModule.forFeature([TechnicalTask]), UserModule, PurchaseModule],
  controllers: [TechnicalTaskController],
  providers: [TechnicalTaskService],
  exports: [TechnicalTaskService],
})
export class TechnicalTaskModule {}
