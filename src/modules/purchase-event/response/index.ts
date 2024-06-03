import { ApiProperty } from '@nestjs/swagger'

export class PurchaseEventResponse {
  @ApiProperty()
  purchase_event_uuid: string

  @ApiProperty()
  purchase_event_name: string

  @ApiProperty({ required: false })
  old_value?: string

  @ApiProperty({ required: false })
  new_value?: string

  @ApiProperty()
  purchase_uuid: string

  @ApiProperty()
  user_uuid: string

  @ApiProperty()
  created_at: Date
}

export class ArrayPurchaseEventResponse {
  @ApiProperty()
  count: number

  @ApiProperty({ required: false, type: PurchaseEventResponse, isArray: true })
  data: PurchaseEventResponse[]
}

export class StatusPurchaseEventResponse {
  @ApiProperty()
  status: boolean

  @ApiProperty({ required: false })
  data?: PurchaseEventResponse
}
