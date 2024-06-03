import { ApiProperty } from '@nestjs/swagger'

export class PlanEventResponse {
  @ApiProperty()
  plan_event_uuid: string

  @ApiProperty()
  plan_event_name: string

  @ApiProperty({ required: false })
  old_value?: string

  @ApiProperty({ required: false })
  new_value?: string

  @ApiProperty()
  plan_uuid: string

  @ApiProperty()
  user_uuid: string

  @ApiProperty()
  created_at: Date
}

export class ArrayPlanEventResponse {
  @ApiProperty()
  count: number

  @ApiProperty({ required: false, type: PlanEventResponse, isArray: true })
  data: PlanEventResponse[]
}

export class StatusPlanEventResponse {
  @ApiProperty()
  status: boolean

  @ApiProperty({ required: false })
  data?: PlanEventResponse
}
