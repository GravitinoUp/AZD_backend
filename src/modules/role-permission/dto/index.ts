import { ApiProperty } from '@nestjs/swagger'

export class CreateRolesPermissionDto {
  @ApiProperty({ required: false })
  role_id?: number

  @ApiProperty({ required: false })
  user_uuid?: string

  @ApiProperty({ default: [] })
  permission_ids: string[]

  @ApiProperty()
  rights: boolean
}

export class UpdateRolePermissionDto {
  @ApiProperty({ required: false })
  role_permission_id?: number

  @ApiProperty({ required: false })
  rights?: boolean
}
