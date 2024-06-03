import { ApiProperty } from '@nestjs/swagger'

export class PermissionResponse {
  @ApiProperty()
  permission_id: string

  @ApiProperty()
  permission_name: string

  @ApiProperty()
  permission_description: string

  @ApiProperty()
  entity_name: string
}

export class ArrayPermissionResponse {
  @ApiProperty()
  count: number

  @ApiProperty({ required: false, type: PermissionResponse, isArray: true })
  data: PermissionResponse[]
}

export class StatusPermissionResponse {
  @ApiProperty()
  status: boolean

  @ApiProperty({ required: false })
  data?: PermissionResponse
}
