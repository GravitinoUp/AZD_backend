import { Field, Int, ObjectType } from '@nestjs/graphql'
import { IsArray, IsBoolean, IsDateString, IsDecimal, IsInt, IsOptional, IsString, IsUUID } from 'class-validator'

@ObjectType()
export class PlanResponse {
  @IsUUID()
  @Field()
  plan_uuid: string

  @IsUUID()
  @Field()
  user_uuid: string

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  purchase_offer_number?: string

  @IsUUID()
  @Field()
  okpd_uuid: string // TODO UUID

  @IsString()
  @Field()
  object_name: string

  @IsUUID()
  @Field()
  okei_uuid: string // TODO UUID

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
  @Field()
  way_id: number

  @IsBoolean()
  @Field()
  small_business: boolean

  @IsString()
  @Field()
  initiator: string

  @IsUUID()
  @Field()
  branch_uuid: string // TODO UUID

  @IsDecimal()
  @IsOptional()
  @Field({ nullable: true })
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

@ObjectType()
export class ArrayPlanResponse {
  @IsInt()
  @Field(() => Int)
  count: number

  @IsArray()
  @Field(() => [PlanResponse], { nullable: true })
  data?: PlanResponse[]
}

@ObjectType()
export class StatusPlanResponse {
  @IsBoolean()
  @Field()
  status: boolean

  @IsOptional()
  @Field({ nullable: true })
  data?: PlanResponse
}
