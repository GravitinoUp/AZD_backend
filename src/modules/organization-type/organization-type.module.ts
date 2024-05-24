import { Module } from '@nestjs/common'
import { OrganizationTypeService } from './organization-type.service'
import { OrganizationTypeResolver } from './organization-type.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrganizationType } from './entities/organization-type.entity'
import { UserModule } from '../user/user.module'

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationType]), UserModule],
  providers: [OrganizationTypeService, OrganizationTypeResolver],
  exports: [OrganizationTypeService],
})
export class OrganizationTypeModule {}
