import { Field, InputType } from '@nestjs/graphql'
import { FilterOffset } from 'src/common/classes/filter_offset'
import { OrganizationFilters, OrganizationSorts } from 'src/modules/organization/filters'
import { PlanWayFilters, PlanWaySorts } from 'src/modules/plan-way/filter'

@InputType()
export class PlanSorts {
  @Field({ nullable: true })
  plan_uuid?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  user_uuid?: 'ASC' | 'DESC' // TODO SORTS FILTER

  @Field({ nullable: true })
  purchase_offer_number?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  okpd_uuid?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  object_name?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  okei_uuid?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  result_name?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  npa_date?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  npa_number?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  current_year_plan_count?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  current_year_plan_avg_price?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  first_year_plan_count?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  first_year_plan_avg_price?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  second_year_plan_count?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  second_year_plan_avg_price?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  next_years_plan_count?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  next_years_plan_avg_price?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  current_year_limit?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  first_year_limit?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  second_year_limit?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  next_years_limit?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  start_max_price?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  public_purchase_discussion?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  authorized_institution?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  organizer_name?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  placement_month?: 'ASC' | 'DESC'

  @Field(() => PlanWaySorts, { nullable: true })
  way?: PlanWaySorts

  @Field({ nullable: true })
  small_business?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  initiator?: 'ASC' | 'DESC'

  @Field(() => OrganizationSorts, { nullable: true })
  branch?: OrganizationSorts

  @Field({ nullable: true })
  price_value?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  savings?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  contract_number?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  contract_date?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  contragent?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  approval_letter?: 'ASC' | 'DESC'
}

@InputType()
export class PlanFilters {
  @Field({ nullable: true })
  plan_uuid?: string

  @Field({ nullable: true })
  user_uuid?: string

  @Field({ nullable: true })
  purchase_offer_number?: string

  @Field({ nullable: true })
  okpd_uuid?: string // TODO UUID

  @Field({ nullable: true })
  object_name?: string

  @Field({ nullable: true })
  okei_uuid?: string // TODO UUID

  @Field({ nullable: true })
  result_name?: string

  @Field({ nullable: true })
  npa_date?: Date

  @Field({ nullable: true })
  npa_number?: string

  @Field({ nullable: true })
  current_year_plan_count?: number

  @Field({ nullable: true })
  current_year_plan_avg_price?: number

  @Field({ nullable: true })
  first_year_plan_count?: number

  @Field({ nullable: true })
  first_year_plan_avg_price?: number

  @Field({ nullable: true })
  second_year_plan_count?: number

  @Field({ nullable: true })
  second_year_plan_avg_price?: number

  @Field({ nullable: true })
  next_years_plan_count?: number

  @Field({ nullable: true })
  next_years_plan_avg_price?: number

  @Field({ nullable: true })
  current_year_limit?: number

  @Field({ nullable: true })
  first_year_limit?: number

  @Field({ nullable: true })
  second_year_limit?: number

  @Field({ nullable: true })
  next_years_limit?: number

  @Field({ nullable: true })
  start_max_price?: number

  @Field({ nullable: true })
  public_purchase_discussion?: boolean

  @Field({ nullable: true })
  authorized_institution?: string

  @Field({ nullable: true })
  organizer_name?: string

  @Field({ nullable: true })
  placement_month?: string

  @Field({ nullable: true })
  way?: PlanWayFilters

  @Field({ nullable: true })
  small_business?: boolean

  @Field({ nullable: true })
  initiator?: string

  @Field(() => OrganizationFilters, { nullable: true })
  branch?: OrganizationFilters

  @Field({ nullable: true })
  price_value?: number

  @Field({ nullable: true })
  savings?: number

  @Field({ nullable: true })
  contract_number?: string

  @Field({ nullable: true })
  contract_date?: Date

  @Field({ nullable: true })
  contragent?: string

  @Field({ nullable: true })
  approval_letter?: string
}

@InputType()
export class PlanFilter {
  @Field({ nullable: true })
  offset?: FilterOffset

  @Field({ nullable: true })
  filter?: PlanFilters

  @Field({ nullable: true })
  sorts?: PlanSorts
}
