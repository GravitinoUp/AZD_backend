import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsInt, IsArray, IsBoolean, IsOptional } from 'class-validator'

export class PurchaseStepResponse {
  @IsInt()
  @ApiProperty()
  purchase_step_id: number

  @IsString()
  @ApiProperty()
  purchase_step_name: string
}

export class ArrayPurchaseStepResponse {
  @IsInt()
  @ApiProperty()
  count: number

  @IsArray()
  @ApiProperty({ required: false, type: PurchaseStepResponse, isArray: true })
  data: PurchaseStepResponse[]
}

export class StatusPurchaseTypeResponse {
  @IsBoolean()
  @ApiProperty()
  status: boolean

  @IsOptional()
  @ApiProperty({ required: false })
  data?: PurchaseStepResponse
}
