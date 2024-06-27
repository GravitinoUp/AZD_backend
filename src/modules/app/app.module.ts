import { Module } from '@nestjs/common'
import { AppService } from './app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import configuration from 'src/config/configuration'
import { ScheduleModule } from '@nestjs/schedule'
import { ThrottlerModule, ThrottlerModuleOptions } from '@nestjs/throttler'
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AuthModule } from '../auth/auth.module'
import { LegalBasis } from '../legal-basis/entities/legal-basis.entity'
import { PersonModule } from '../person/person.module'
import { RoleModule } from '../role/role.module'
import { UserModule } from '../user/user.module'
import { AcceptLanguageResolver, I18nModule } from 'nestjs-i18n'
import { CacheModule, CacheOptions } from '@nestjs/cache-manager'
import * as redisStore from 'cache-manager-redis-store'
import { PermissionModule } from '../permission/permission.module'
import { RolePermissionModule } from '../role-permission/role-permission.module'
import { OrganizationModule } from '../organization/organization.module'
import { OrganizationTypeModule } from '../organization-type/organization-type.module'
import { PropertiesModule } from '../properties/properties.module'
import { PlanWayModule } from '../plan-way/plan-way.module'
import { RedisClientOptions } from 'redis'
import { OkpdModule } from '../okpd/okpd.module'
import { PlanEventModule } from '../plan-event/plan-event.module'
import { CurrencyModule } from '../currency/currency.module'
import { LimitModule } from '../limit/limit.module'
import { LimitEventModule } from '../limit-event/limit-event.module'
import { PurchaseTypeModule } from '../purchase-type/purchase-type.module'
import { PurchaseStepModule } from '../purchase-step/purchase-step.module'
import { KosguModule } from '../kosgu/kosgu.module'
import { KbkModule } from '../kbk/kbk.module'
import { TechnicalTaskModule } from '../technical-task/technical-task.module'
import { LimitStatusModule } from '../limit-status/limit-status.module'
import { PurchaseModule } from '../purchase/purchase.module'
import { PlanStatusModule } from '../plan-status/plan-status.module'
import { PlanPositionModule } from '../plan-position/plan-position.module'
import { BranchModule } from '../branch/branch.module'
import { PlanModule } from '../plan/plan.module'
import { OkeiModule } from '../okei/okei.module'
import { ProductModule } from '../product/product.module'
import { DocumentModule } from '../document/document.module'
import { DocumentTypeModule } from '../document-type/document-type.module'
import { EntityModule } from '../entity/entity.module'
import { AgreementStatusModule } from '../agreement-status/agreement-status.module'
import { RoleAgreementModule } from '../role-agreement/role-agreement.module'
import { AgreementModule } from '../agreement/agreement.module'
import { CommercialOfferModule } from '../commercial-offer/commercial-offer.module'
import { RuleModule } from '../rule/rule.module'

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'ru',
      fallbacks: {
        'ru-*': 'ru',
      },
      loaderOptions: {
        path: './dist/i18n/',
        watch: true,
      },
      resolvers: [AcceptLanguageResolver],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    CacheModule.registerAsync<RedisClientOptions>({
      imports: [ConfigModule],
      inject: [ConfigService],
      isGlobal: true,
      useFactory: async (configService: ConfigService) => {
        const options: CacheOptions =
          configService.get('disable_cache') == 'true'
            ? {}
            : {
                store: redisStore,
                host: configService.get('redis_host'),
                port: configService.get('redis_port'),
                ttl: configService.get('cache_ttl'),
              }

        return options
      },
    }),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const options: ThrottlerModuleOptions = {
          storage: new ThrottlerStorageRedisService({
            host: config.get('redis_host'),
            port: config.get('redis_port'),
          }),
          throttlers: [
            {
              ttl: config.get('throttle_ttl'),
              limit: config.get('throttle_limit'),
            },
          ],
        }

        return options
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('db_host'),
        port: config.get('db_port'),
        username: config.get('db_username'),
        password: config.get('db_password'),
        database: config.get('db_name'),
        entities: ['dist/modules/**/entities/*.entity{.ts,.js}'],
        autoLoadEntities: false,
        synchronize: false,
        migrationsRun: false,
        logging: true,
      }),
    }),
    AgreementModule,
    AgreementStatusModule,
    AuthModule,
    BranchModule,
    CommercialOfferModule,
    CurrencyModule,
    DocumentModule,
    DocumentTypeModule,
    EntityModule,
    KbkModule,
    KosguModule,
    LegalBasis,
    LimitModule,
    LimitEventModule,
    LimitStatusModule,
    OkeiModule,
    OkpdModule,
    OrganizationModule,
    OrganizationTypeModule,
    PermissionModule,
    PersonModule,
    PlanModule,
    PlanPositionModule,
    PlanEventModule,
    PlanStatusModule,
    PlanWayModule,
    ProductModule,
    PropertiesModule,
    PurchaseModule,
    PurchaseStepModule,
    PurchaseTypeModule,
    RoleModule,
    RoleAgreementModule,
    RolePermissionModule,
    RuleModule,
    TechnicalTaskModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
