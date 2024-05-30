import { ApiProperty } from '@nestjs/swagger'
import { IsDecimal } from 'class-validator'
import { AppStrings } from 'src/common/constants/strings'
import BaseModel from 'src/common/model'
import { Organization } from 'src/modules/organization/entities/organization.entity'
import { PlanWay } from 'src/modules/plan-way/entities/plan-way.entity'
import { User } from 'src/modules/user/entities/user.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity({ name: 'Plans' })
export class Plan extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  plan_uuid: string

  @Column()
  @ApiProperty({ required: false, description: AppStrings.PLAN_PURCHASE_NAME })
  purchase_name?: string

  @IsDecimal()
  @ApiProperty({ required: false, description: AppStrings.PLAN_PURCHASE_PRICE })
  purchase_price?: number

  @Column()
  @ApiProperty({ required: false, description: AppStrings.PLAN_PURCHASE_DATE })
  purchase_date?: Date

  @Column()
  @ApiProperty({ required: false, description: AppStrings.PLAN_PURCHASE_UUID })
  purchase_uuid?: string // TODO UUID

  @Column()
  @ApiProperty()
  user_uuid: string

  @Column()
  @ApiProperty({ description: AppStrings.PLAN_KOSGU })
  kosgu: string

  @ManyToOne(() => User, (user) => user.plans)
  @JoinColumn({ name: 'user_uuid', referencedColumnName: 'user_uuid' })
  @ApiProperty()
  user: User

  @Column({ nullable: true })
  @ApiProperty({ required: false, description: AppStrings.PLAN_OFFER_NUMBER })
  purchase_offer_number?: string

  @Column()
  @ApiProperty({ description: AppStrings.PLAN_OKPD2 })
  okpd_uuid: string // TODO NAME

  @Column()
  @ApiProperty({ description: AppStrings.PLAN_OBJECT_NAME })
  object_name: string

  @Column()
  @ApiProperty({ description: AppStrings.PLAN_OKEI })
  okei_uuid: string // TODO NAME

  @Column()
  @ApiProperty({ description: AppStrings.PLAN_RESULT_NAME })
  result_name: string

  @Column()
  @ApiProperty({
    description: AppStrings.PLAN_NPA_DATE,
  })
  npa_date: Date

  @Column()
  @ApiProperty({
    description: AppStrings.PLAN_NPA_NUMBER,
  })
  npa_number: string

  @Column({ default: 0 })
  @ApiProperty({ description: AppStrings.PLAN_CURRENT_YEAR_COUNT })
  current_year_plan_count: number

  @Column({ type: 'decimal', default: 0 })
  @ApiProperty({ description: AppStrings.PLAN_CURRENT_YEAR_PRICE })
  current_year_plan_avg_price: number

  @Column({ default: 0 })
  @ApiProperty({ description: AppStrings.PLAN_FIRST_YEAR_COUNT })
  first_year_plan_count: number

  @Column({ type: 'decimal', default: 0 })
  @ApiProperty({ description: AppStrings.PLAN_FIRST_YEAR_PRICE })
  first_year_plan_avg_price: number

  @Column({ default: 0 })
  @ApiProperty({ description: AppStrings.PLAN_SECOND_YEAR_COUNT })
  second_year_plan_count: number

  @Column({ type: 'decimal', default: 0 })
  @ApiProperty({ description: AppStrings.PLAN_SECOND_YEAR_PRICE })
  second_year_plan_avg_price: number

  @Column({ default: 0 })
  @ApiProperty({ description: AppStrings.PLAN_NEXT_YEAR_COUNT })
  next_years_plan_count: number

  @Column({ type: 'decimal', default: 0 })
  @ApiProperty({ description: AppStrings.PLAN_NEXT_YEAR_PRICE })
  next_years_plan_avg_price: number

  @Column({ type: 'decimal', default: 0 })
  @ApiProperty({ description: AppStrings.PLAN_CURRENT_YEAR_LIMIT })
  current_year_limit: number

  @Column({ type: 'decimal', default: 0 })
  @ApiProperty({ description: AppStrings.PLAN_FIRST_YEAR_LIMIT })
  first_year_limit: number

  @Column({ type: 'decimal', default: 0 })
  @ApiProperty({ description: AppStrings.PLAN_SECOND_YEAR_LIMIT })
  second_year_limit: number

  @Column({ type: 'decimal', default: 0 })
  @ApiProperty({ description: AppStrings.PLAN_NEXT_YEAR_LIMIT })
  next_years_limit: number

  @Column({ type: 'decimal', default: 0 })
  @ApiProperty({ description: AppStrings.PLAN_START_MAX_PRICE })
  start_max_price: number

  @Column()
  @ApiProperty({ description: AppStrings.PLAN_PUBLIC_PURCHASE_DISCUSSION })
  public_purchase_discussion: boolean

  @Column({ nullable: true })
  @ApiProperty({
    required: false,
    description: AppStrings.PLAN_AUTHORIZED_INSTITUTION,
  })
  authorized_institution?: string

  @Column({ nullable: true })
  @ApiProperty({
    required: false,
    description: AppStrings.PLAN_ORGANIZER_NAME,
  })
  organizer_name?: string

  @Column()
  @ApiProperty({ description: AppStrings.PLAN_PLACEMENT_MONTH })
  placement_month: string

  @Column()
  @ApiProperty({ description: AppStrings.PLAN_WAY_ID })
  way_id: number

  @ManyToOne(() => PlanWay, (way) => way.plans)
  @JoinColumn({ name: 'way_id', referencedColumnName: 'way_id' })
  @ApiProperty({ description: AppStrings.PLAN_WAY })
  way: PlanWay

  @Column()
  @ApiProperty({ description: AppStrings.PLAN_SMALL_BUSINESS })
  small_business: boolean

  @Column()
  @ApiProperty({ description: AppStrings.PLAN_INITIATOR })
  initiator: string

  @Column()
  @ApiProperty({ description: AppStrings.PLAN_BRANCH_UUID })
  branch_uuid: string

  @ManyToOne(() => Organization, (organization) => organization.plans)
  @JoinColumn({ name: 'branch_uuid', referencedColumnName: 'organization_uuid' })
  @ApiProperty({ description: AppStrings.PLAN_BRANCH })
  branch: Organization

  @Column({ type: 'decimal', nullable: true })
  @ApiProperty({
    required: false,
    description: AppStrings.PLAN_PRICE_VALUE,
  })
  price_value?: number

  @Column({ type: 'decimal', nullable: true })
  @ApiProperty({
    required: false,
    description: AppStrings.PLAN_SAVINGS,
  })
  savings?: number

  @Column({ nullable: true })
  @ApiProperty({ required: false, description: AppStrings.PLAN_CONTRACT_NUMBER })
  contract_number?: string

  @Column({ nullable: true })
  @ApiProperty({ required: false, description: AppStrings.PLAN_CONTRACT_DATE })
  contract_date?: Date

  @Column({ nullable: true })
  @ApiProperty({ required: false, description: AppStrings.PLAN_CONTRAGENT })
  contragent?: string

  @Column()
  @ApiProperty({ description: AppStrings.PLAN_APPROVAL_LETTER })
  approval_letter: string
}
