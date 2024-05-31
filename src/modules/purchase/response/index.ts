import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsInt, IsArray, IsBoolean, IsOptional, IsUUID, IsDecimal } from 'class-validator'
import { Currency } from 'src/modules/currency/entities/currency.entity'
import { Organization } from 'src/modules/organization/entities/organization.entity'
import { PurchaseStep } from 'src/modules/purchase-step/entities/purchase-step.entity'
import { PurchaseType } from 'src/modules/purchase-type/entities/purchase-type.entity'
import { User } from 'src/modules/user/entities/user.entity'

export class PurchaseResponse {
  @IsUUID()
  @ApiProperty()
  purchase_uuid?: string

  @IsString()
  @ApiProperty()
  purchase_name?: string

  @ApiProperty()
  purchase_type?: PurchaseType

  @ApiProperty()
  initiator?: User

  @ApiProperty()
  executor?: Organization

  @IsString()
  @ApiProperty()
  purchase_identification_code?: string

  @IsString()
  @ApiProperty()
  contract_identification_code?: string

  @ApiProperty()
  start_date?: Date

  @ApiProperty()
  end_date?: Date

  @IsDecimal()
  @ApiProperty()
  start_max_price?: number

  @IsDecimal()
  @ApiProperty()
  end_price?: number

  @ApiProperty()
  currency?: Currency

  @ApiProperty()
  purchase_step?: PurchaseStep

  @IsString()
  @ApiProperty()
  delivery_address?: string

  @IsBoolean()
  @ApiProperty()
  is_organization_fund?: boolean

  @IsDecimal()
  @ApiProperty()
  application_enforcement?: number

  @IsBoolean()
  @ApiProperty()
  is_unilateral_refusal?: boolean

  @IsDecimal()
  @ApiProperty()
  contract_enforcement?: number

  @IsDecimal()
  @ApiProperty()
  quality_guarantee_period?: number

  @IsDecimal()
  @ApiProperty()
  manufacturer_guarantee?: number

  @IsDecimal()
  @ApiProperty()
  warranty_obligations_enforcement?: number

  @IsString()
  @ApiProperty()
  additional_info?: string
}

export class ArrayPurchaseResponse {
  @IsInt()
  @ApiProperty()
  count: number

  @IsArray()
  @ApiProperty({ required: false, type: PurchaseResponse, isArray: true })
  data?: PurchaseResponse[]
}

export class StatusPurchaseTypeResponse {
  @IsBoolean()
  @ApiProperty()
  status: boolean

  @IsOptional()
  @ApiProperty({ required: false })
  data?: PurchaseResponse
}
