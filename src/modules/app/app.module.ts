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
import { PlanModule } from '../plan/plan.module'
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
    AuthModule,
    CurrencyModule,
    KbkModule,
    KosguModule,
    LegalBasis,
    LimitModule,
    LimitEventModule,
    OkpdModule,
    OrganizationModule,
    OrganizationTypeModule,
    PermissionModule,
    PersonModule,
    PlanModule,
    PlanEventModule,
    PlanWayModule,
    PropertiesModule,
    PurchaseStepModule,
    PurchaseTypeModule,
    RoleModule,
    RolePermissionModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
