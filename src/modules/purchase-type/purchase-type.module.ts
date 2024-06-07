import { Module } from '@nestjs/common'
import { PurchaseTypeService } from './purchase-type.service'
import { PurchaseTypeController } from './purchase-type.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PurchaseType } from './entities/purchase-type.entity'

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseType])],
  controllers: [PurchaseTypeController],
  providers: [PurchaseTypeService],
  exports: [PurchaseTypeService],
})
export class PurchaseTypeModule {}
