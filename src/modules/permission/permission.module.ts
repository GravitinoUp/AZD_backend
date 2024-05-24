import { Module } from '@nestjs/common'
import { PermissionService } from './permission.service'
import { PermissionResolver } from './permission.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Permission } from './entities/permission.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  providers: [PermissionService, PermissionResolver],
  exports: [PermissionService],
})
export class PermissionModule {}
