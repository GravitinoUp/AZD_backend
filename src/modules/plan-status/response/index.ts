import { ApiProperty } from '@nestjs/swagger'

export class PlanStatusResponse {
  @ApiProperty()
  plan_status_id: number

  @ApiProperty()
  plan_status_name: string
}

export class ArrayPlanStatusResponse {
  @ApiProperty()
  count: number

  @ApiProperty({ required: false, type: PlanStatusResponse, isArray: true })
  data: PlanStatusResponse[]
}

export class StatusPlanStatusResponse {
  @ApiProperty()
  status: boolean

  @ApiProperty({ required: false })
  data?: PlanStatusResponse
}
