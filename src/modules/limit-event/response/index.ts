import { ApiProperty } from '@nestjs/swagger'

export class LimitEventResponse {
  @ApiProperty()
  limit_event_uuid: string

  @ApiProperty()
  limit_event_name: string

  @ApiProperty({ required: false })
  old_value?: string

  @ApiProperty({ required: false })
  new_value?: string

  @ApiProperty()
  limit_uuid: string

  @ApiProperty()
  user_uuid: string

  @ApiProperty()
  created_at: Date
}

export class ArrayLimitEventResponse {
  @ApiProperty()
  count: number

  @ApiProperty({ required: false, type: LimitEventResponse, isArray: true })
  data: LimitEventResponse[]
}

export class StatusLimitEventResponse {
  @ApiProperty()
  status: boolean

  @ApiProperty({ required: false })
  data?: LimitEventResponse
}
