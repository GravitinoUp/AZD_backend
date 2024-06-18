import { ApiProperty } from '@nestjs/swagger'
import { AppEntityResponse } from 'src/modules/entity/response'

export class AgreementStatusResponse {
  @ApiProperty()
  agreement_status_id: number

  @ApiProperty()
  agreement_status_name: string

  @ApiProperty()
  entity_id: number

  @ApiProperty({ required: false })
  entity?: AppEntityResponse
}

export class ArrayAgreementStatusResponse {
  @ApiProperty()
  count: number

  @ApiProperty({ required: false, type: AgreementStatusResponse, isArray: true })
  data: AgreementStatusResponse[]
}

export class StatusAgreementStatusResponse {
  @ApiProperty()
  status: boolean

  @ApiProperty({ required: false })
  data?: AgreementStatusResponse
}
