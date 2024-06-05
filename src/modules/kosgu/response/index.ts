import { ApiProperty } from '@nestjs/swagger'

export class KosguResponse {
  @ApiProperty()
  kosgu_uuid: string

  @ApiProperty()
  kosgu_code: string

  @ApiProperty()
  kosgu_name: string
}

export class ArrayKosguResponse {
  @ApiProperty()
  count: number

  @ApiProperty({ required: false, type: KosguResponse, isArray: true })
  data: KosguResponse[]
}

export class StatusKosguResponse {
  @ApiProperty()
  status: boolean

  @ApiProperty({ required: false })
  data?: KosguResponse
}
