import { Module } from '@nestjs/common'
import { PersonService } from './person.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Person } from './entities/person.entity'
import { PersonController } from './person.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Person])],
  controllers: [PersonController],
  providers: [PersonService],
  exports: [PersonService],
})
export class PersonModule {}
