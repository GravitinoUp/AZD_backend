import { Module } from '@nestjs/common'
import { PurchaseService } from './purchase.service'
import { PurchaseController } from './purchase.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Purchase } from './entities/purchase.entity'
import { UserModule } from '../user/user.module'
import { PurchaseTypeModule } from '../purchase-type/purchase-type.module'
import { OrganizationModule } from '../organization/organization.module'
import { RolePermissionModule } from '../role-permission/role-permission.module'
import { CurrencyModule } from '../currency/currency.module'
import { RuleModule } from '../rule/rule.module'
import { PropertiesModule } from '../properties/properties.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Purchase]),
    UserModule,
    PurchaseTypeModule,
    OrganizationModule,
    RolePermissionModule,
    CurrencyModule,
    RuleModule,
    PropertiesModule,
  ],
  controllers: [PurchaseController],
  providers: [PurchaseService],
  exports: [PurchaseService],
})
export class PurchaseModule {}
