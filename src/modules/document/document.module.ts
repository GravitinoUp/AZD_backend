import { Module } from '@nestjs/common'
import { DocumentService } from './document.service'
import { DocumentController } from './document.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Document } from './entities/document.entity'
import { UserModule } from '../user/user.module'
import { RolePermissionModule } from '../role-permission/role-permission.module'
import { PurchaseModule } from '../purchase/purchase.module'
import { DocumentTypeModule } from '../document-type/document-type.module'
import { OrganizationModule } from '../organization/organization.module'
import { PersonModule } from '../person/person.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Document]),
    UserModule,
    RolePermissionModule,
    PurchaseModule,
    DocumentTypeModule,
    OrganizationModule,
    PersonModule,
  ],
  controllers: [DocumentController],
  providers: [DocumentService],
  exports: [DocumentService],
})
export class DocumentModule {}
