import { Module } from '@nestjs/common'
import { OrganizationService } from './organization.service'
import { OrganizationController } from './organization.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Organization } from './entities/organization.entity'
import { UserModule } from '../user/user.module'
import { OrganizationTypeModule } from '../organization-type/organization-type.module'
import { PersonModule } from '../person/person.module'
import { RolePermissionModule } from '../role-permission/role-permission.module'
import { PropertiesModule } from '../properties/properties.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Organization]),
    UserModule,
    OrganizationTypeModule,
    PersonModule,
    RolePermissionModule,
    PropertiesModule,
  ],
  controllers: [OrganizationController],
  providers: [OrganizationService],
  exports: [OrganizationService],
})
export class OrganizationModule {}
