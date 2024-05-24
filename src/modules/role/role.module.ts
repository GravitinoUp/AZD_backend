import { Module } from '@nestjs/common'
import { RoleService } from './role.service'
import { UserModule } from '../user/user.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Role } from './entities/role.entity'
import { RolesResolver } from './role.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([Role]), UserModule],
  providers: [RoleService, RolesResolver],
  exports: [RoleService],
})
export class RoleModule {}
