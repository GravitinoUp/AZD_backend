import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { PropertiesService } from '../properties/properties.service'
import { PropertyName } from '../properties/entities/property-name.entity'
import { PropertyValue } from '../properties/entities/property-value.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User, PropertyName, PropertyValue])],
  controllers: [UserController],
  providers: [UserService, PropertiesService],
  exports: [UserService],
})
export class UserModule {}
