import { Module } from '@nestjs/common'
import { AppService } from './app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import configuration from 'src/config/configuration'
import { ScheduleModule } from '@nestjs/schedule'
import { ThrottlerModule } from '@nestjs/throttler'
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AuthModule } from '../auth/auth.module'
import { LegalBasis } from '../legal-basis/entities/legal-basis.entity'
import { PersonModule } from '../person/person.module'
import { RoleModule } from '../role/role.module'
import { UserModule } from '../user/user.module'
import { join } from 'path'
import { AcceptLanguageResolver, I18nModule } from 'nestjs-i18n'
import { CacheModule } from '@nestjs/cache-manager'
import { redisStore } from 'cache-manager-redis-yet'
import { PermissionModule } from '../permission/permission.module'
import { RolePermissionModule } from '../role-permission/role-permission.module'
import { OrganizationModule } from '../organization/organization.module'
import { OrganizationTypeModule } from '../organization-type/organization-type.module'

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'ru',
      fallbacks: {
        'ru-*': 'ru',
      },
      loaderOptions: {
        path: join(__dirname.split('dist')[0], 'dist/i18n/'),
        watch: true,
      },
      resolvers: [AcceptLanguageResolver],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      isGlobal: true,
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('redis_host'),
        port: configService.get('redis_port'),
        ttl: configService.get('cache_ttl'),
      }),
    }),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        storage: new ThrottlerStorageRedisService(),
        throttlers: [
          {
            ttl: config.get('throttle_ttl'),
            limit: config.get('throttle_limit'),
          },
        ],
      }),
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
    LegalBasis,
    OrganizationModule,
    OrganizationTypeModule,
    PermissionModule,
    PersonModule,
    RoleModule,
    RolePermissionModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
