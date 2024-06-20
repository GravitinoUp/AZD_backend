import { Module } from '@nestjs/common'
import { CommercialOfferService } from './commercial-offer.service'
import { CommercialOfferController } from './commercial-offer.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CommercialOffer } from './entities/commercial-offer.entity'
import { MailModule } from '../mail/mail.module'
import { UserModule } from '../user/user.module'
import { RolePermissionModule } from '../role-permission/role-permission.module'
import { PurchaseModule } from '../purchase/purchase.module'
import { OrganizationModule } from '../organization/organization.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([CommercialOffer]),
    MailModule,
    UserModule,
    RolePermissionModule,
    PurchaseModule,
    OrganizationModule,
  ],
  controllers: [CommercialOfferController],
  providers: [CommercialOfferService],
  exports: [CommercialOfferService],
})
export class CommercialOfferModule {}
