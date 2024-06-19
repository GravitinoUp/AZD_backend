import { Module } from '@nestjs/common'
import { EntityService } from './entity.service'
import { EntityController } from './entity.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppEntity } from './entities/app-entity.entity'

@Module({
  imports: [TypeOrmModule.forFeature([AppEntity])],
  controllers: [EntityController],
  providers: [EntityService],
  exports: [EntityService],
})
export class EntityModule {}
