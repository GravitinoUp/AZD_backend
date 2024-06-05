import { ApiProperty } from '@nestjs/swagger'
import { AppStrings } from 'src/common/constants/strings'
import { OkpdResponse } from 'src/modules/okpd/response'
import { OrganizationResponse } from 'src/modules/organization/response'
import { WayResponse } from 'src/modules/plan-way/response'
import { PurchaseResponse } from 'src/modules/purchase/response'
import { UserResponse } from 'src/modules/user/response'

export class PlanResponse {
  @ApiProperty()
  plan_uuid: string

  @ApiProperty({ required: false, description: AppStrings.PLAN_PURCHASE_NAME })
  purchase_name?: string

  @ApiProperty({ required: false, description: AppStrings.PLAN_PURCHASE_PRICE })
  purchase_price?: number

  @ApiProperty({ required: false, description: AppStrings.PLAN_PURCHASE_DATE })
  purchase_date?: Date

  @ApiProperty({ required: false, description: AppStrings.PLAN_PURCHASE_UUID })
  purchase_uuid?: string

  @ApiProperty({ required: false, description: AppStrings.PLAN_PURCHASE_UUID })
  purchase?: PurchaseResponse

  @ApiProperty({ description: AppStrings.PLAN_KOSGU })
  kosgu: string

  @ApiProperty()
  user_uuid: string

  @ApiProperty()
  user?: UserResponse

  @ApiProperty({ required: false, description: AppStrings.PLAN_OFFER_NUMBER })
  purchase_offer_number?: string

  @ApiProperty({ description: AppStrings.PLAN_OKPD2 })
  okpd_uuid: string

  @ApiProperty({ description: AppStrings.PLAN_OKPD2 })
  okpd: OkpdResponse

  @ApiProperty({ description: AppStrings.PLAN_OBJECT_NAME })
  object_name: string

  @ApiProperty({ description: AppStrings.PLAN_OKEI })
  okei_uuid: string

  @ApiProperty({ description: AppStrings.PLAN_RESULT_NAME })
  result_name: string

  @ApiProperty({
    description: AppStrings.PLAN_NPA_DATE,
  })
  npa_date: Date

  @ApiProperty({
    description: AppStrings.PLAN_NPA_NUMBER,
  })
  npa_number: string

  @ApiProperty({ description: AppStrings.PLAN_CURRENT_YEAR_COUNT })
  current_year_plan_count: number

  @ApiProperty({ description: AppStrings.PLAN_CURRENT_YEAR_PRICE })
  current_year_plan_avg_price: number

  @ApiProperty({ description: AppStrings.PLAN_FIRST_YEAR_COUNT })
  first_year_plan_count: number

  @ApiProperty({ description: AppStrings.PLAN_FIRST_YEAR_PRICE })
  first_year_plan_avg_price: number

  @ApiProperty({ description: AppStrings.PLAN_SECOND_YEAR_COUNT })
  second_year_plan_count: number

  @ApiProperty({ description: AppStrings.PLAN_SECOND_YEAR_PRICE })
  second_year_plan_avg_price: number

  @ApiProperty({ description: AppStrings.PLAN_NEXT_YEAR_COUNT })
  next_years_plan_count: number

  @ApiProperty({ description: AppStrings.PLAN_NEXT_YEAR_PRICE })
  next_years_plan_avg_price: number

  @ApiProperty({ description: AppStrings.PLAN_CURRENT_YEAR_LIMIT })
  current_year_limit: number

  @ApiProperty({ description: AppStrings.PLAN_FIRST_YEAR_LIMIT })
  first_year_limit: number

  @ApiProperty({ description: AppStrings.PLAN_SECOND_YEAR_LIMIT })
  second_year_limit: number

  @ApiProperty({ description: AppStrings.PLAN_NEXT_YEAR_LIMIT })
  next_years_limit: number

  @ApiProperty({ description: AppStrings.PLAN_START_MAX_PRICE })
  start_max_price: number

  @ApiProperty({ description: AppStrings.PLAN_PUBLIC_PURCHASE_DISCUSSION })
  public_purchase_discussion: boolean

  @ApiProperty({ required: false, description: AppStrings.PLAN_AUTHORIZED_INSTITUTION })
  authorized_institution?: string

  @ApiProperty({
    required: false,
    description: AppStrings.PLAN_ORGANIZER_NAME,
  })
  organizer_name?: string

  @ApiProperty({ description: AppStrings.PLAN_PLACEMENT_MONTH })
  placement_month: string

  @ApiProperty({ description: AppStrings.PLAN_WAY_ID })
  way_id: number

  @ApiProperty({ description: AppStrings.PLAN_WAY })
  way?: WayResponse

  @ApiProperty({ description: AppStrings.PLAN_SMALL_BUSINESS })
  small_business: boolean

  @ApiProperty({ description: AppStrings.PLAN_INITIATOR })
  initiator: string

  @ApiProperty({ description: AppStrings.PLAN_BRANCH_UUID })
  branch_uuid: string

  @ApiProperty({ description: AppStrings.PLAN_BRANCH })
  branch?: OrganizationResponse

  @ApiProperty({
    required: false,
    description: AppStrings.PLAN_PRICE_VALUE,
  })
  price_value?: number

  @ApiProperty({
    required: false,
    description: AppStrings.PLAN_SAVINGS,
  })
  savings?: number

  @ApiProperty({ required: false, description: AppStrings.PLAN_CONTRACT_NUMBER })
  contract_number?: string

  @ApiProperty({ required: false, description: AppStrings.PLAN_CONTRACT_DATE })
  contract_date?: Date

  @ApiProperty({ required: false, description: AppStrings.PLAN_CONTRAGENT })
  contragent?: string

  @ApiProperty({ description: AppStrings.PLAN_APPROVAL_LETTER })
  approval_letter: string
}

export class ArrayPlanResponse {
  @ApiProperty()
  count: number

  @ApiProperty({ required: false, type: PlanResponse, isArray: true })
  data: PlanResponse[]
}

export class StatusPlanResponse {
  @ApiProperty()
  status: boolean

  @ApiProperty({ required: false })
  data?: PlanResponse
}
