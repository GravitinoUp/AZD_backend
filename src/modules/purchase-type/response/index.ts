import { ApiProperty } from '@nestjs/swagger'

export class PurchaseTypeResponse {
  @ApiProperty()
  purchase_type_id: number

  @ApiProperty()
  purchase_type_name: string
}

export class ArrayPurchaseTypeResponse {
  @ApiProperty()
  count: number

  @ApiProperty({ required: false, type: PurchaseTypeResponse, isArray: true })
  data: PurchaseTypeResponse[]
}

export class StatusPurchaseTypeResponse {
  @ApiProperty()
  status: boolean

  @ApiProperty({ required: false })
  data?: PurchaseTypeResponse
}
