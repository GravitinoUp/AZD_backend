import { ApiProperty } from '@nestjs/swagger'

export class OkeiResponse {
  @ApiProperty()
  okei_uuid: string

  @ApiProperty()
  okei_code: string

  @ApiProperty()
  okei_full_name: string

  @ApiProperty()
  okei_short_name: string
}

export class ArrayOkeiResponse {
  @ApiProperty()
  count: number

  @ApiProperty({ required: false, type: OkeiResponse, isArray: true })
  data: OkeiResponse[]
}

export class StatusOkeiResponse {
  @ApiProperty()
  status: boolean

  @ApiProperty({ required: false })
  data?: OkeiResponse
}
