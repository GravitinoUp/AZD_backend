import { Module } from '@nestjs/common'
import { OrganizationTypeService } from './organization-type.service'
import { OrganizationTypeController } from './organization-type.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrganizationType } from './entities/organization-type.entity'

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationType])],
  controllers: [OrganizationTypeController],
  providers: [OrganizationTypeService],
  exports: [OrganizationTypeService],
})
export class OrganizationTypeModule {}
