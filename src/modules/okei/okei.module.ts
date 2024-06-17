import { Module } from '@nestjs/common'
import { OkeiService } from './okei.service'
import { OkeiController } from './okei.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Okei } from './entities/okei.entity'
import { UserModule } from '../user/user.module'
import { RolePermissionModule } from '../role-permission/role-permission.module'

@Module({
  imports: [TypeOrmModule.forFeature([Okei]), UserModule, RolePermissionModule],
  controllers: [OkeiController],
  providers: [OkeiService],
  exports: [OkeiService],
})
export class OkeiModule {}
