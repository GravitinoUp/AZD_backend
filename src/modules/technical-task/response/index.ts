import { ApiProperty } from '@nestjs/swagger'
import { PurchaseResponse } from 'src/modules/purchase/response'

export class TechnicalTaskResponse {
  @ApiProperty()
  technical_task_uuid: string

  @ApiProperty()
  purchase_uuid: string

  @ApiProperty({ required: false })
  purchase: PurchaseResponse

  @ApiProperty()
  data_json: string
}

export class ArrayTechnicalTaskResponse {
  @ApiProperty()
  count: number

  @ApiProperty({ required: false, type: TechnicalTaskResponse, isArray: true })
  data: TechnicalTaskResponse[]
}

export class StatusTechnicalTaskResponse {
  @ApiProperty()
  status: boolean

  @ApiProperty({ required: false })
  data?: TechnicalTaskResponse
}
