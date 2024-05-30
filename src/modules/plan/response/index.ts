import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsBoolean, IsDateString, IsDecimal, IsInt, IsOptional, IsString, IsUUID } from 'class-validator'
import { AppStrings } from 'src/common/constants/strings'
import { OrganizationResponse } from 'src/modules/organization/response'
import { WayResponse } from 'src/modules/plan-way/response'
import { UserResponse } from 'src/modules/user/response'

export class PlanResponse {
  @IsUUID()
  @ApiProperty()
  plan_uuid: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, description: AppStrings.PLAN_PURCHASE_NAME })
  purchase_name?: string

  @IsDecimal()
  @IsOptional()
  @ApiProperty({ required: false, description: AppStrings.PLAN_PURCHASE_PRICE })
  purchase_price?: number

  @IsDateString()
  @IsOptional()
  @ApiProperty({ required: false, description: AppStrings.PLAN_PURCHASE_DATE })
  purchase_date?: Date

  @IsUUID()
  @IsOptional()
  @ApiProperty({ required: false, description: AppStrings.PLAN_PURCHASE_UUID })
  purchase_uuid?: string

  @IsString()
  @ApiProperty({ description: AppStrings.PLAN_KOSGU })
  kosgu: string

  @IsUUID()
  @ApiProperty()
  user_uuid: string

  @IsOptional()
  @ApiProperty()
  user?: UserResponse

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, description: AppStrings.PLAN_OFFER_NUMBER })
  purchase_offer_number?: string

  @IsString()
  @ApiProperty({ description: AppStrings.PLAN_OKPD2 })
  okpd_code: string

  @IsString()
  @ApiProperty({ description: AppStrings.PLAN_OBJECT_NAME })
  object_name: string

  @IsString()
  @ApiProperty({ description: AppStrings.PLAN_OKEI })
  okei_code: string

  @IsString()
  @ApiProperty({ description: AppStrings.PLAN_RESULT_NAME })
  result_name: string

  @IsDateString()
  @ApiProperty({
    description: AppStrings.PLAN_NPA_DATE,
  })
  npa_date: Date

  @IsString()
  @ApiProperty({
    description: AppStrings.PLAN_NPA_NUMBER,
  })
  npa_number: string

  @IsInt()
  @ApiProperty({ description: AppStrings.PLAN_CURRENT_YEAR_COUNT })
  current_year_plan_count: number

  @IsDecimal()
  @ApiProperty({ description: AppStrings.PLAN_CURRENT_YEAR_PRICE })
  current_year_plan_avg_price: number

  @IsInt()
  @ApiProperty({ description: AppStrings.PLAN_FIRST_YEAR_COUNT })
  first_year_plan_count: number

  @IsDecimal()
  @ApiProperty({ description: AppStrings.PLAN_FIRST_YEAR_PRICE })
  first_year_plan_avg_price: number

  @IsInt()
  @ApiProperty({ description: AppStrings.PLAN_SECOND_YEAR_COUNT })
  second_year_plan_count: number

  @IsDecimal()
  @ApiProperty({ description: AppStrings.PLAN_SECOND_YEAR_PRICE })
  second_year_plan_avg_price: number

  @IsInt()
  @ApiProperty({ description: AppStrings.PLAN_NEXT_YEAR_COUNT })
  next_years_plan_count: number

  @IsDecimal()
  @ApiProperty({ description: AppStrings.PLAN_NEXT_YEAR_PRICE })
  next_years_plan_avg_price: number

  @IsDecimal()
  @ApiProperty({ description: AppStrings.PLAN_CURRENT_YEAR_LIMIT })
  current_year_limit: number

  @IsDecimal()
  @ApiProperty({ description: AppStrings.PLAN_FIRST_YEAR_LIMIT })
  first_year_limit: number

  @IsDecimal()
  @ApiProperty({ description: AppStrings.PLAN_SECOND_YEAR_LIMIT })
  second_year_limit: number

  @IsDecimal()
  @ApiProperty({ description: AppStrings.PLAN_NEXT_YEAR_LIMIT })
  next_years_limit: number

  @IsDecimal()
  @ApiProperty({ description: AppStrings.PLAN_START_MAX_PRICE })
  start_max_price: number

  @IsBoolean()
  @ApiProperty({ description: AppStrings.PLAN_PUBLIC_PURCHASE_DISCUSSION })
  public_purchase_discussion: boolean

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, description: AppStrings.PLAN_AUTHORIZED_INSTITUTION })
  authorized_institution?: string

  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
    description: AppStrings.PLAN_ORGANIZER_NAME,
  })
  organizer_name?: string

  @IsString()
  @ApiProperty({ description: AppStrings.PLAN_PLACEMENT_MONTH })
  placement_month: string

  @IsInt()
  @ApiProperty({ description: AppStrings.PLAN_WAY_ID })
  way_id: number

  @IsOptional()
  @ApiProperty({ description: AppStrings.PLAN_WAY })
  way?: WayResponse

  @IsBoolean()
  @ApiProperty({ description: AppStrings.PLAN_SMALL_BUSINESS })
  small_business: boolean

  @IsString()
  @ApiProperty({ description: AppStrings.PLAN_INITIATOR })
  initiator: string

  @IsUUID()
  @ApiProperty({ description: AppStrings.PLAN_BRANCH_UUID })
  branch_uuid: string

  @IsOptional()
  @ApiProperty({ description: AppStrings.PLAN_BRANCH })
  branch?: OrganizationResponse

  @IsDecimal()
  @IsOptional()
  @ApiProperty({
    required: false,
    description: AppStrings.PLAN_PRICE_VALUE,
  })
  price_value?: number

  @IsDecimal()
  @IsOptional()
  @ApiProperty({
    required: false,
    description: AppStrings.PLAN_SAVINGS,
  })
  savings?: number

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, description: AppStrings.PLAN_CONTRACT_NUMBER })
  contract_number?: string

  @IsDateString()
  @IsOptional()
  @ApiProperty({ required: false, description: AppStrings.PLAN_CONTRACT_DATE })
  contract_date?: Date

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, description: AppStrings.PLAN_CONTRAGENT })
  contragent?: string

  @IsString()
  @ApiProperty({ description: AppStrings.PLAN_APPROVAL_LETTER })
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
