import { Module } from '@nestjs/common'
import { KosguService } from './kosgu.service'
import { KosguController } from './kosgu.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Kosgu } from './entities/kosgu.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Kosgu])],
  controllers: [KosguController],
  providers: [KosguService],
  exports: [KosguService],
})
export class KosguModule {}
