import { Module } from '@nestjs/common'
import { KbkService } from './kbk.service'
import { KbkController } from './kbk.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { KBK } from './entities/kbk.entity'
import { KBKValue } from './entities/kbk-value.entity'

@Module({
  imports: [TypeOrmModule.forFeature([KBK, KBKValue])],
  controllers: [KbkController],
  providers: [KbkService],
  exports: [KbkService],
})
export class KbkModule {}
