import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsInt, IsArray, IsBoolean, IsOptional } from 'class-validator'

export class PurchaseTypeResponse {
  @IsInt()
  @ApiProperty()
  purchase_type_id: number

  @IsString()
  @ApiProperty()
  purchase_type_name: string
}

export class ArrayPurchaseTypeResponse {
  @IsInt()
  @ApiProperty()
  count: number

  @IsArray()
  @ApiProperty({ required: false, type: PurchaseTypeResponse, isArray: true })
  data: PurchaseTypeResponse[]
}

export class StatusPurchaseTypeResponse {
  @IsBoolean()
  @ApiProperty()
  status: boolean

  @IsOptional()
  @ApiProperty({ required: false })
  data?: PurchaseTypeResponse
}
