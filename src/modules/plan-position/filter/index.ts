import { ApiProperty } from '@nestjs/swagger'
import { FilterOffset } from 'src/common/classes/filter_offset'
import { AppStrings } from 'src/common/constants/strings'
import { OkpdFilters, OkpdSorts } from 'src/modules/okpd/filters'
import { PlanFilters, PlanSorts } from 'src/modules/plan/filters'

export class PlanPositionSorts {
  @ApiProperty({ default: AppStrings.ASC, required: false })
  plan_position_uuid?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  plan_uuid?: 'ASC' | 'DESC'

  @ApiProperty({ required: false })
  plan?: PlanSorts

  @ApiProperty({ default: AppStrings.ASC, required: false })
  purchase_name?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  purchase_price?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  purchase_date?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  purchase_uuid?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  kosgu?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  user_uuid?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  purchase_offer_number?: 'ASC' | 'DESC'

  @ApiProperty({ required: false })
  okpd?: OkpdSorts

  @ApiProperty({ default: AppStrings.ASC, required: false })
  object_name?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  okei_uuid?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  result_name?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  npa_date?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  npa_number?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  current_year_plan_count?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  current_year_plan_avg_price?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  first_year_plan_count?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  first_year_plan_avg_price?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  second_year_plan_count?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  second_year_plan_avg_price?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  next_years_plan_count?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  next_years_plan_avg_price?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  current_year_limit?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  first_year_limit?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  second_year_limit?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  next_years_limit?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  start_max_price?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  public_purchase_discussion?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  authorized_institution?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  organizer_name?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  placement_month?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  way_id?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  small_business?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  initiator?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  price_value?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  savings?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  contract_number?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  contract_date?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  contragent?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  approval_letter?: 'ASC' | 'DESC'
}

export class PlanPositionFilters {
  @ApiProperty({ required: false })
  plan_position_uuid?: string

  @ApiProperty({ required: false })
  plan_uuid?: string

  @ApiProperty({ required: false })
  plan?: PlanFilters

  @ApiProperty({ required: false })
  purchase_name?: string

  @ApiProperty({ required: false })
  purchase_date?: Date

  @ApiProperty({ required: false })
  purchase_price?: number

  @ApiProperty({ required: false })
  purchase_uuid?: string

  @ApiProperty({ required: false })
  kosgu?: string

  @ApiProperty({ required: false })
  user_uuid?: string

  @ApiProperty({ required: false })
  purchase_offer_number?: string

  @ApiProperty({ required: false })
  okpd?: OkpdFilters

  @ApiProperty({ required: false })
  object_name?: string

  @ApiProperty({ required: false })
  okei_uuid?: string // TODO UUID

  @ApiProperty({ required: false })
  result_name?: string

  @ApiProperty({ required: false })
  npa_date?: Date

  @ApiProperty({ required: false })
  npa_number?: string

  @ApiProperty({ required: false })
  current_year_plan_count?: number

  @ApiProperty({ required: false })
  current_year_plan_avg_price?: number

  @ApiProperty({ required: false })
  first_year_plan_count?: number

  @ApiProperty({ required: false })
  first_year_plan_avg_price?: number

  @ApiProperty({ required: false })
  second_year_plan_count?: number

  @ApiProperty({ required: false })
  second_year_plan_avg_price?: number

  @ApiProperty({ required: false })
  next_years_plan_count?: number

  @ApiProperty({ required: false })
  next_years_plan_avg_price?: number

  @ApiProperty({ required: false })
  current_year_limit?: number

  @ApiProperty({ required: false })
  first_year_limit?: number

  @ApiProperty({ required: false })
  second_year_limit?: number

  @ApiProperty({ required: false })
  next_years_limit?: number

  @ApiProperty({ required: false })
  start_max_price?: number

  @ApiProperty({ required: false })
  public_purchase_discussion?: boolean

  @ApiProperty({ required: false })
  authorized_institution?: string

  @ApiProperty({ required: false })
  organizer_name?: string

  @ApiProperty({ required: false })
  placement_month?: string

  @ApiProperty({ required: false })
  way_id?: number

  @ApiProperty({ required: false })
  small_business?: boolean

  @ApiProperty({ required: false })
  initiator?: string

  @ApiProperty({ required: false })
  price_value?: number

  @ApiProperty({ required: false })
  savings?: number

  @ApiProperty({ required: false })
  contract_number?: string

  @ApiProperty({ required: false })
  contract_date?: Date

  @ApiProperty({ required: false })
  contragent?: string

  @ApiProperty({ required: false })
  approval_letter?: string
}

export class PlanPositionFilter {
  @ApiProperty({ required: false })
  offset?: FilterOffset

  @ApiProperty({ required: false })
  filter?: PlanPositionFilters

  @ApiProperty({ required: false })
  sorts?: PlanPositionSorts
}
