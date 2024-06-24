import { ApiProperty } from '@nestjs/swagger'
import { AppEntityResponse } from 'src/modules/entity/response'
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
