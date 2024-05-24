import { Module } from '@nestjs/common'
import { OrganizationService } from './organization.service'
import { OrganizationResolver } from './organization.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Organization } from './entities/organization.entity'
import { UserModule } from '../user/user.module'
import { OrganizationTypeModule } from '../organization-type/organization-type.module'
import { PersonModule } from '../person/person.module'

@Module({
  imports: [TypeOrmModule.forFeature([Organization]), UserModule, OrganizationTypeModule, PersonModule],
  providers: [OrganizationService, OrganizationResolver],
  exports: [OrganizationService],
})
export class OrganizationModule {}
