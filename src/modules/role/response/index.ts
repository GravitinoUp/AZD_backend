import { ApiProperty } from '@nestjs/swagger'
import { AppStrings } from 'src/common/constants/strings'

export class RoleResponse {
  @ApiProperty()
  role_id: number

  @ApiProperty()
  role_name: string

  @ApiProperty({ description: AppStrings.PROPERTY_VALUES })
  property_values: string[]
}

export class ArrayRoleResponse {
  @ApiProperty()
  count: number

  @ApiProperty({ required: false, type: RoleResponse, isArray: true })
  data: RoleResponse[]
}

export class StatusRoleResponse {
  @ApiProperty()
  status: boolean

  @ApiProperty({ required: false })
  data?: RoleResponse
}
