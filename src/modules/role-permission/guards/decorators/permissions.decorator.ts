import { SetMetadata } from '@nestjs/common'
import { PermissionEnum } from 'src/common/enums/permission.enum'

export const HasPermissions = (...permissions: PermissionEnum[]) =>
  SetMetadata('permissions', permissions)
