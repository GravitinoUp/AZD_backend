import { ApiProperty } from '@nestjs/swagger'

export class PurchaseStepResponse {
  @ApiProperty()
  purchase_step_id: number

  @ApiProperty()
  purchase_step_name: string
}

export class ArrayPurchaseStepResponse {
  @ApiProperty()
  count: number

  @ApiProperty({ required: false, type: PurchaseStepResponse, isArray: true })
  data: PurchaseStepResponse[]
}

export class StatusPurchaseTypeResponse {
  @ApiProperty()
  status: boolean

  @ApiProperty({ required: false })
  data?: PurchaseStepResponse
}
