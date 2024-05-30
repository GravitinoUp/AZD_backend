import { Module } from '@nestjs/common'
import { OkpdService } from './okpd.service'
import { OkpdController } from './okpd.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Okpd } from './entities/okpd.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Okpd])],
  controllers: [OkpdController],
  providers: [OkpdService],
  exports: [OkpdService],
})
export class OkpdModule {}
