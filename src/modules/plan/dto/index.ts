import { ApiProperty } from '@nestjs/swagger'
import { IsUUID, IsString, IsInt, IsBoolean, IsDateString, IsOptional } from 'class-validator'

export class CreatePlanDto {
  @IsUUID()
  @ApiProperty()
  user_uuid: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  purchase_offer_number?: string

  @IsUUID()
  @ApiProperty()
  okpd_uuid: string

  @IsString()
  @ApiProperty()
  object_name: string

  @IsUUID()
  @ApiProperty()
  okei_uuid: string

  @IsString()
  @ApiProperty()
  result_name: string

  @IsDateString()
  @ApiProperty()
  npa_date: Date

  @IsString()
  @ApiProperty()
  npa_number: string

  @IsInt()
  @ApiProperty()
  current_year_plan_count: number

  // @IsDecimal()
  @ApiProperty()
  current_year_plan_avg_price: number

  @IsInt()
  @ApiProperty()
  first_year_plan_count: number

  // @IsDecimal()
  @ApiProperty()
  first_year_plan_avg_price: number

  @IsInt()
  @ApiProperty()
  second_year_plan_count: number

  // @IsDecimal()
  @ApiProperty()
  second_year_plan_avg_price: number

  @IsInt()
  @ApiProperty()
  next_years_plan_count: number

  // @IsDecimal()
  @ApiProperty()
  next_years_plan_avg_price: number

  // @IsDecimal()
  @ApiProperty()
  current_year_limit: number

  // @IsDecimal()
  @ApiProperty()
  first_year_limit: number

  // @IsDecimal()
  @ApiProperty()
  second_year_limit: number

  // @IsDecimal()
  @ApiProperty()
  next_years_limit: number

  // @IsDecimal()
  @ApiProperty()
  start_max_price: number

  @IsBoolean()
  @ApiProperty()
  public_purchase_discussion: boolean

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  authorized_institution?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  organizer_name?: string

  @IsString()
  @ApiProperty()
  placement_month: string

  @IsInt()
  @ApiProperty()
  way_id: number

  @IsBoolean()
  @ApiProperty()
  small_business: boolean

  @IsString()
  @ApiProperty()
  initiator: string

  @IsUUID()
  @ApiProperty()
  branch_uuid: string

  // // @IsDecimal()
  @IsOptional()
  @ApiProperty()
  price_value?: number

  // // @IsDecimal()
  @IsOptional()
  @ApiProperty({ required: false })
  savings?: number

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  contract_number?: string

  // @IsDateString()
  @IsOptional()
  @ApiProperty({ required: false })
  contract_date?: Date

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  contragent?: string

  @IsString()
  @ApiProperty()
  approval_letter: string
}

export class UpdatePlanDto {
  @IsUUID()
  @ApiProperty()
  plan_uuid: string

  @IsUUID()
  @IsOptional()
  @ApiProperty({ required: false })
  user_uuid?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  purchase_offer_number?: string

  @IsUUID()
  @IsOptional()
  @ApiProperty({ required: false })
  okpd_uuid?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  object_name?: string

  @IsUUID()
  @IsOptional()
  @ApiProperty({ required: false })
  okei_uuid?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  result_name?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  npa_date?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  npa_number?: string

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  current_year_plan_count?: number

  // @IsDecimal()
  @IsOptional()
  @ApiProperty({ required: false })
  current_year_plan_avg_price?: number

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  first_year_plan_count?: number

  // @IsDecimal()
  @IsOptional()
  @ApiProperty({ required: false })
  first_year_plan_avg_price?: number

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  second_year_plan_count?: number

  // @IsDecimal()
  @IsOptional()
  @ApiProperty({ required: false })
  second_year_plan_avg_price?: number

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  next_years_plan_count?: number

  // @IsDecimal()
  @IsOptional()
  @ApiProperty({ required: false })
  next_years_plan_avg_price?: number

  // @IsDecimal()
  @IsOptional()
  @ApiProperty({ required: false })
  start_max_price?: number

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false })
  public_purchase_discussion?: boolean

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  authorized_institution?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  organizer_name?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  placement_month?: string

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  way_id?: number

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false })
  small_business?: boolean

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  initiator?: string

  @IsUUID()
  @IsOptional()
  @ApiProperty({ required: false })
  branch_uuid?: string

  // @IsDecimal()
  @IsOptional()
  @ApiProperty()
  price_value?: number

  // @IsDecimal()
  @IsOptional()
  @ApiProperty({ required: false })
  savings?: number

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  contract_number?: string

  @IsDateString()
  @IsOptional()
  @ApiProperty({ required: false })
  contract_date?: Date

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  contragent?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  approval_letter?: string
}
