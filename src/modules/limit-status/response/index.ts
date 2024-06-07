import { ApiProperty } from '@nestjs/swagger'

export class LimitStatusResponse {
  @ApiProperty()
  limit_status_id: number

  @ApiProperty()
  limit_status_name: string
}

export class ArrayLimitStatusResponse {
  @ApiProperty()
  count: number

  @ApiProperty({ required: false, type: LimitStatusResponse, isArray: true })
  data: LimitStatusResponse[]
}

export class StatusLimitStatusResponse {
  @ApiProperty()
  status: boolean

  @ApiProperty({ required: false })
  data?: LimitStatusResponse
}
