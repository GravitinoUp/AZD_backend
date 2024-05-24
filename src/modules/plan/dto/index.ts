import { Field, InputType, Int } from '@nestjs/graphql'
import { IsUUID, IsString, IsInt, IsBoolean, IsDateString, IsOptional, IsDecimal } from 'class-validator'

@InputType()
export class CreatePlanDto {
  @IsUUID()
  @Field()
  user_uuid: string

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  purchase_offer_number?: string

  @IsUUID()
  @Field()
  okpd_uuid: string

  @IsString()
  @Field()
  object_name: string

  @IsUUID()
  @Field()
  okei_uuid: string

  @IsString()
  @Field()
  result_name: string

  @IsDateString()
  @Field()
  npa_date: Date

  @IsString()
  @Field()
  npa_number: string

  @IsInt()
  @Field(() => Int)
  current_year_plan_count: number

  @IsDecimal()
  @Field()
  current_year_plan_avg_price: number

  @IsInt()
  @Field(() => Int)
  first_year_plan_count: number

  @IsDecimal()
  @Field()
  first_year_plan_avg_price: number

  @IsInt()
  @Field(() => Int)
  second_year_plan_count: number

  @IsDecimal()
  @Field()
  second_year_plan_avg_price: number

  @IsInt()
  @Field(() => Int)
  next_years_plan_count: number

  @IsDecimal()
  @Field()
  next_years_plan_avg_price: number

  @IsDecimal()
  @Field()
  current_year_limit: number

  @IsDecimal()
  @Field()
  first_year_limit: number

  @IsDecimal()
  @Field()
  second_year_limit: number

  @IsDecimal()
  @Field()
  next_years_limit: number

  @IsDecimal()
  @Field()
  start_max_price: number

  @IsBoolean()
  @Field()
  public_purchase_discussion: boolean

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  authorized_institution?: string

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  organizer_name?: string

  @IsString()
  @Field()
  placement_month: string

  @IsInt()
  @Field(() => Int)
  way_id: number

  @IsBoolean()
  @Field()
  small_business: boolean

  @IsString()
  @Field()
  initiator: string

  @IsUUID()
  @Field()
  branch_uuid: string

  @IsDecimal()
  @IsOptional()
  @Field()
  price_value?: number

  @IsDecimal()
  @IsOptional()
  @Field({ nullable: true })
  savings?: number

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  contract_number?: string

  @IsDateString()
  @IsOptional()
  @Field({ nullable: true })
  contract_date?: Date

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  contragent?: string

  @IsString()
  @Field()
  approval_letter: string
}

@InputType()
export class UpdatePlanDto {
  @IsUUID()
  @Field()
  plan_uuid: string

  @IsUUID()
  @IsOptional()
  @Field({ nullable: true })
  user_uuid?: string

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  purchase_offer_number?: string

  @IsUUID()
  @IsOptional()
  @Field({ nullable: true })
  okpd_uuid?: string

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  object_name?: string

  @IsUUID()
  @IsOptional()
  @Field({ nullable: true })
  okei_uuid?: string

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  result_name?: string

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  npa_date?: string

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  npa_number?: string

  @IsInt()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  current_year_plan_count?: number

  @IsDecimal()
  @IsOptional()
  @Field({ nullable: true })
  current_year_plan_avg_price?: number

  @IsInt()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  first_year_plan_count?: number

  @IsDecimal()
  @IsOptional()
  @Field({ nullable: true })
  first_year_plan_avg_price?: number

  @IsInt()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  second_year_plan_count?: number

  @IsDecimal()
  @IsOptional()
  @Field({ nullable: true })
  second_year_plan_avg_price?: number

  @IsInt()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  next_years_plan_count?: number

  @IsDecimal()
  @IsOptional()
  @Field({ nullable: true })
  next_years_plan_avg_price?: number

  @IsDecimal()
  @IsOptional()
  @Field({ nullable: true })
  start_max_price?: number

  @IsBoolean()
  @IsOptional()
  @Field({ nullable: true })
  public_purchase_discussion?: boolean

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  authorized_institution?: string

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  organizer_name?: string

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  placement_month?: string

  @IsInt()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  way_id?: number

  @IsBoolean()
  @IsOptional()
  @Field({ nullable: true })
  small_business?: boolean

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  initiator?: string

  @IsUUID()
  @IsOptional()
  @Field({ nullable: true })
  branch_uuid?: string

  @IsDecimal()
  @IsOptional()
  @Field()
  price_value?: number

  @IsDecimal()
  @IsOptional()
  @Field({ nullable: true })
  savings?: number

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  contract_number?: string

  @IsDateString()
  @IsOptional()
  @Field({ nullable: true })
  contract_date?: Date

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  contragent?: string

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  approval_letter?: string
}
