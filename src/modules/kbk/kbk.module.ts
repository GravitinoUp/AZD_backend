import { Module } from '@nestjs/common'
import { KbkService } from './kbk.service'
import { KbkController } from './kbk.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { KBK } from './entities/kbk.entity'
import { KBKValue } from './entities/kbk-value.entity'
import { UserModule } from '../user/user.module'
import { RolePermissionModule } from '../role-permission/role-permission.module'
import { KBKType } from './entities/kbk-type.entity'

@Module({
  imports: [TypeOrmModule.forFeature([KBK, KBKValue, KBKType]), UserModule, RolePermissionModule],
  controllers: [KbkController],
  providers: [KbkService],
  exports: [KbkService],
})
export class KbkModule {}
