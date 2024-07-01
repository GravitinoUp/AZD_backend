import { Module } from '@nestjs/common'
import { RuleService } from './rule.service'
import { RuleController } from './rule.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Rule } from './entities/rule.entity'
import { UserModule } from '../user/user.module'
import { RolePermissionModule } from '../role-permission/role-permission.module'

@Module({
  imports: [TypeOrmModule.forFeature([Rule]), UserModule, RolePermissionModule],
  controllers: [RuleController],
  providers: [RuleService],
  exports: [RuleService],
})
export class RuleModule {}
