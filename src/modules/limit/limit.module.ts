import { Module } from '@nestjs/common'
import { LimitService } from './limit.service'
import { LimitController } from './limit.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Limit } from './entities/limit.entity'
import { UserModule } from '../user/user.module'
import { CurrencyModule } from '../currency/currency.module'
import { KbkModule } from '../kbk/kbk.module'
import { KosguModule } from '../kosgu/kosgu.module'

@Module({
  imports: [TypeOrmModule.forFeature([Limit]), UserModule, CurrencyModule, KbkModule, KosguModule],
  controllers: [LimitController],
  providers: [LimitService],
})
export class LimitModule {}
