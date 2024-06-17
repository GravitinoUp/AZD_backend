import { Module } from '@nestjs/common'
import { OkpdService } from './okpd.service'
import { OkpdController } from './okpd.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Okpd } from './entities/okpd.entity'
import { UserModule } from '../user/user.module'
import { RolePermissionModule } from '../role-permission/role-permission.module'

@Module({
  imports: [TypeOrmModule.forFeature([Okpd]), UserModule, RolePermissionModule],
  controllers: [OkpdController],
  providers: [OkpdService],
  exports: [OkpdService],
})
export class OkpdModule {}
