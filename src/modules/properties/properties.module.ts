import { Module } from '@nestjs/common'
import { PropertiesService } from './properties.service'
import { PropertiesResolver } from './properties.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PropertyValue } from './entities/property-value.entity'
import { PropertyName } from './entities/property-name.entity'
import { UserModule } from '../user/user.module'

@Module({
  imports: [TypeOrmModule.forFeature([PropertyValue, PropertyName]), UserModule],
  providers: [PropertiesService, PropertiesResolver],
  exports: [PropertiesService],
})
export class PropertiesModule {}
