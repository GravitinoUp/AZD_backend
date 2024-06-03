import { ApiProperty } from '@nestjs/swagger'

export class RolePermissionResponse {
  @ApiProperty()
  role_permission_id: number

  @ApiProperty()
  role_id?: number

  @ApiProperty()
  user_uuid?: string

  @ApiProperty()
  permission_id: string

  @ApiProperty()
  rights: boolean
}

export class ArrayRolePermissionResponse {
  @ApiProperty()
  count: number

  @ApiProperty({ required: false, type: RolePermissionResponse, isArray: true })
  data: RolePermissionResponse[]
}

export class StatusArrayRolePermissionResponse {
  @ApiProperty()
  status: boolean

  @ApiProperty({ required: false })
  data?: RolePermissionResponse[]
}

export class StatusRolePermissionResponse {
  @ApiProperty()
  status: boolean

  @ApiProperty({ required: false })
  data?: RolePermissionResponse
}
