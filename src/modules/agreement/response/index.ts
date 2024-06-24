import { ApiProperty } from '@nestjs/swagger'
import { AgreementStatusResponse } from 'src/modules/agreement-status/response'
import { AppEntityResponse } from 'src/modules/entity/response'
import { RoleAgreementResponse } from 'src/modules/role-agreement/response'

export class AgreementResponse {
  @ApiProperty()
  agreement_uuid: string

  @ApiProperty()
  role_agreement_uuid: string

  @ApiProperty({ required: false })
  role_agreement?: RoleAgreementResponse

  @ApiProperty()
  agreement_status_id: number

  @ApiProperty({ required: false })
  agreement_status?: AgreementStatusResponse

  @ApiProperty({ required: false })
  document_uuid?: string

  @ApiProperty({ required: false })
  entity_id?: number

  @ApiProperty({ required: false })
  entity?: AppEntityResponse
}

export class ArrayAgreementResponse {
  @ApiProperty()
  count: number

  @ApiProperty({ required: false, type: AgreementResponse, isArray: true })
  data: AgreementResponse[]
}

export class StatusAgreementResponse {
  @ApiProperty()
  status: boolean

  @ApiProperty({ required: false })
  data?: AgreementResponse
}

export class StatusArrayAgreementResponse {
  @ApiProperty()
  status: boolean

  @ApiProperty({ required: false, type: AgreementResponse, isArray: true })
  data?: AgreementResponse[]
}
