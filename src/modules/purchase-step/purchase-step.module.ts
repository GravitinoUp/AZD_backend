import { Module } from '@nestjs/common'
import { PurchaseStepService } from './purchase-step.service'
import { PurchaseStepController } from './purchase-step.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PurchaseStep } from './entities/purchase-step.entity'

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseStep])],
  controllers: [PurchaseStepController],
  providers: [PurchaseStepService],
})
export class PurchaseStepModule {}
