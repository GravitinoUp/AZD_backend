import { Module } from '@nestjs/common'
import { PurchaseService } from './purchase.service'
import { PurchaseController } from './purchase.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Purchase } from './entities/purchase.entity'
import { UserModule } from '../user/user.module'

@Module({
  imports: [TypeOrmModule.forFeature([Purchase]), UserModule],
  controllers: [PurchaseController],
  providers: [PurchaseService],
  exports: [PurchaseService],
})
export class PurchaseModule {}
