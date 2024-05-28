import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsBoolean, IsDateString, IsDecimal, IsInt, IsOptional, IsString, IsUUID } from 'class-validator'
import { OrganizationResponse } from 'src/modules/organization/response'
import { WayResponse } from 'src/modules/plan-way/response'
import { UserResponse } from 'src/modules/user/response'

export class PlanResponse {
  @IsUUID()
  @ApiProperty()
  plan_uuid: string

  @IsUUID()
  @ApiProperty()
  user_uuid: string

  @IsOptional()
  @ApiProperty()
  user?: UserResponse

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  purchase_offer_number?: string

  @IsUUID()
  @ApiProperty()
  okpd_uuid: string // TODO UUID

  @IsString()
  @ApiProperty()
  object_name: string

  @IsUUID()
  @ApiProperty()
  okei_uuid: string // TODO UUID

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

  @IsDecimal()
  @ApiProperty()
  current_year_plan_avg_price: number

  @IsInt()
  @ApiProperty()
  first_year_plan_count: number

  @IsDecimal()
  @ApiProperty()
  first_year_plan_avg_price: number

  @IsInt()
  @ApiProperty()
  second_year_plan_count: number

  @IsDecimal()
  @ApiProperty()
  second_year_plan_avg_price: number

  @IsInt()
  @ApiProperty()
  next_years_plan_count: number

  @IsDecimal()
  @ApiProperty()
  next_years_plan_avg_price: number

  @IsDecimal()
  @ApiProperty()
  current_year_limit: number

  @IsDecimal()
  @ApiProperty()
  first_year_limit: number

  @IsDecimal()
  @ApiProperty()
  second_year_limit: number

  @IsDecimal()
  @ApiProperty()
  next_years_limit: number

  @IsDecimal()
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

  @IsOptional()
  @ApiProperty()
  way?: WayResponse

  @IsBoolean()
  @ApiProperty()
  small_business: boolean

  @IsString()
  @ApiProperty()
  initiator: string

  @IsUUID()
  @ApiProperty()
  branch_uuid: string

  @IsOptional()
  @ApiProperty()
  branch?: OrganizationResponse

  @IsDecimal()
  @IsOptional()
  @ApiProperty({ required: false })
  price_value?: number

  @IsDecimal()
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
  @ApiProperty()
  approval_letter: string
}

export class ArrayPlanResponse {
  @IsInt()
  @ApiProperty()
  count: number

  @IsArray()
  @ApiProperty({ required: false, type: PlanResponse, isArray: true })
  data: PlanResponse[]
}

export class StatusPlanResponse {
  @IsBoolean()
  @ApiProperty()
  status: boolean

  @IsOptional()
  @ApiProperty({ required: false })
  data?: PlanResponse
}
