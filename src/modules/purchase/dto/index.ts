import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsDateString, IsDecimal, IsInt, IsOptional, IsString, IsUUID } from 'class-validator'

export class CreatePurchaseDto {
  @IsString()
  @ApiProperty()
  purchase_name: string

  @IsInt()
  @ApiProperty()
  purchase_type_id: number

  @IsString()
  @ApiProperty()
  initiator_uuid: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  executor_uuid?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  purchase_identification_code?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  contract_identification_code?: string

  @IsDateString()
  @IsOptional()
  @ApiProperty({ required: false })
  start_date?: Date

  @IsDateString()
  @ApiProperty()
  end_date: Date

  @IsDecimal()
  @IsOptional()
  @ApiProperty({ required: false })
  start_max_price?: number

  @IsDecimal()
  @IsOptional()
  @ApiProperty({ required: false })
  end_price?: number

  @IsString()
  @ApiProperty()
  currency_code: string

  @IsString()
  @ApiProperty()
  delivery_address: string

  @IsBoolean()
  @ApiProperty()
  is_organization_fund: boolean

  @IsDecimal()
  @IsOptional()
  @ApiProperty({ required: false })
  application_enforcement?: number

  @IsBoolean()
  @ApiProperty()
  is_unilateral_refusal: boolean

  @IsDecimal()
  @IsOptional()
  @ApiProperty({ required: false })
  contract_enforcement?: number

  @IsInt()
  @ApiProperty()
  quality_guarantee_period: number

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  manufacturer_guarantee?: number

  @IsDecimal()
  @IsOptional()
  @ApiProperty({ required: false })
  warranty_obligations_enforcement?: number

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  additional_info?: string
}

export class UpdatePurchaseDto {
  @IsUUID()
  @ApiProperty()
  purchase_uuid: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  purchase_name?: string

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  purchase_type_id?: number

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  initiator_uuid?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  executor_uuid?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  purchase_identification_code?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  contract_identification_code?: string

  @IsDateString()
  @IsOptional()
  @ApiProperty({ required: false })
  start_date?: Date

  @IsDateString()
  @IsOptional()
  @ApiProperty({ required: false })
  end_date?: Date

  @IsDecimal()
  @IsOptional()
  @ApiProperty({ required: false })
  start_max_price?: number

  @IsDecimal()
  @IsOptional()
  @ApiProperty({ required: false })
  end_price?: number

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  currency_code?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  delivery_address?: string

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false })
  is_organization_fund?: boolean

  @IsDecimal()
  @IsOptional()
  @ApiProperty({ required: false })
  application_enforcement?: number

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false })
  is_unilateral_refusal?: boolean

  @IsDecimal()
  @IsOptional()
  @ApiProperty({ required: false })
  contract_enforcement?: number

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  quality_guarantee_period?: number

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  manufacturer_guarantee?: number

  @IsDecimal()
  @IsOptional()
  @ApiProperty({ required: false })
  warranty_obligations_enforcement?: number

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  additional_info?: string
}
