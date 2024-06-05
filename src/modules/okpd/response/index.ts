import { ApiProperty } from '@nestjs/swagger'

export class OkpdResponse {
  @ApiProperty()
  okpd_uuid: string

  @ApiProperty()
  okpd_code: string

  @ApiProperty()
  okpd_name: string

  @ApiProperty()
  okpd_data_json: string
}

export class ArrayOrganizationResponse {
  @ApiProperty()
  count: number

  @ApiProperty({ required: false, type: OkpdResponse, isArray: true })
  data: OkpdResponse[]
}

export class StatusOrganizationResponse {
  @ApiProperty()
  status: boolean

  @ApiProperty({ required: false })
  data?: OkpdResponse
}
