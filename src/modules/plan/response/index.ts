import { ApiProperty } from '@nestjs/swagger'
import { BranchResponse } from 'src/modules/branch/response'
import { PlanStatusResponse } from 'src/modules/plan-status/response'

export class PlanResponse {
  @ApiProperty()
  plan_uuid: string

  @ApiProperty()
  plan_number: number

  @ApiProperty({ required: false })
  plan_status_id: number

  @ApiProperty({ required: false })
  plan_status?: PlanStatusResponse

  @ApiProperty()
  plan_version: number

  @ApiProperty()
  branch: BranchResponse

  @ApiProperty()
  created_at: Date
}

export class ArrayPlanResponse {
  @ApiProperty()
  count: number

  @ApiProperty({ required: false, type: PlanResponse, isArray: true })
  data: PlanResponse[]
}

export class StatusPlanResponse {
  @ApiProperty()
  status: boolean

  @ApiProperty({ required: false })
  data?: PlanResponse
}
