import { ApiProperty } from '@nestjs/swagger'
import { AppEntityResponse } from 'src/modules/entity/response'
import { PermissionResponse } from 'src/modules/permission/response'
import { RoleResponse } from 'src/modules/role/response'

export class RoleAgreementResponse {
  @ApiProperty()
  role_agreement_uuid: string

  @ApiProperty({ required: false })
  parent_role_id?: number

  @ApiProperty({ required: false })
  parent_role?: RoleResponse

  @ApiProperty()
  role_id: number

  @ApiProperty({ required: false })
  role?: RoleResponse

  @ApiProperty()
  permission_id?: string

  @ApiProperty({ required: false })
  permission?: PermissionResponse

  @ApiProperty()
  entity_id: number

  @ApiProperty({ required: false })
  entity?: AppEntityResponse
}

export class ArrayRoleAgreementResponse {
  @ApiProperty()
  count: number

  @ApiProperty({ required: false, type: RoleAgreementResponse, isArray: true })
  data: RoleAgreementResponse[]
}

export class StatusRoleAgreementResponse {
  @ApiProperty()
  status: boolean

  @ApiProperty({ required: false })
  data?: RoleAgreementResponse
}
