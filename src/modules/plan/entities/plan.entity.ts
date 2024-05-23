import { ApiProperty } from '@nestjs/swagger'
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
  @ApiProperty()
  user_uuid: string

  @ManyToOne(() => User, (user) => user.plans)
  @JoinColumn({ name: 'user_uuid', referencedColumnName: 'user_uuid' })
  @ApiProperty()
  user: User

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  purchase_offer_number?: string

  @Column()
  @ApiProperty()
  okpd_uuid: string // TODO UUID

  @Column()
  @ApiProperty()
  object_name: string

  @Column()
  @ApiProperty()
  okei_uuid: string // TODO UUID

  @Column()
  @ApiProperty()
  result_name: string

  @Column()
  @ApiProperty()
  npa_date: Date

  @Column()
  @ApiProperty()
  npa_number: string

  @Column({ default: 0 })
  @ApiProperty()
  current_year_plan_count: number

  @Column({ type: 'decimal', default: 0 })
  @ApiProperty()
  current_year_plan_avg_price: number

  @Column({ default: 0 })
  @ApiProperty()
  first_year_plan_count: number

  @Column({ type: 'decimal', default: 0 })
  @ApiProperty()
  first_year_plan_avg_price: number

  @Column({ default: 0 })
  @ApiProperty()
  second_year_plan_count: number

  @Column({ type: 'decimal', default: 0 })
  @ApiProperty()
  second_year_plan_avg_price: number

  @Column({ default: 0 })
  @ApiProperty()
  next_years_plan_count: number

  @Column({ type: 'decimal', default: 0 })
  @ApiProperty()
  next_years_plan_avg_price: number

  @Column({ type: 'decimal', default: 0 })
  @ApiProperty()
  current_year_limit: number

  @Column({ type: 'decimal', default: 0 })
  @ApiProperty()
  first_year_limit: number

  @Column({ type: 'decimal', default: 0 })
  @ApiProperty()
  second_year_limit: number

  @Column({ type: 'decimal', default: 0 })
  @ApiProperty()
  next_years_limit: number

  @Column({ type: 'decimal', default: 0 })
  @ApiProperty()
  start_max_price: number

  @Column()
  @ApiProperty()
  public_purchase_discussion: boolean

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  authorized_institution?: string

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  organizer_name?: string

  @Column()
  @ApiProperty()
  placement_month: string

  @Column()
  @ApiProperty()
  way_id: number

  @ManyToOne(() => PlanWay, (way) => way.plans)
  @JoinColumn({ name: 'way_id', referencedColumnName: 'way_id' })
  @ApiProperty()
  way: PlanWay

  @Column()
  @ApiProperty()
  small_business: boolean

  @Column()
  @ApiProperty()
  initiator: string

  @Column()
  @ApiProperty()
  branch_uuid: string

  @ManyToOne(() => Organization, (organization) => organization.plans)
  @JoinColumn({ name: 'branch_uuid', referencedColumnName: 'organization_uuid' })
  @ApiProperty()
  branch: Organization

  @Column({ type: 'decimal', nullable: true })
  @ApiProperty({ required: false })
  price_value?: number

  @Column({ type: 'decimal', nullable: true })
  @ApiProperty({ required: false })
  savings?: number

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  contract_number?: string

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  contract_date?: Date

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  contragent?: string

  @Column()
  @ApiProperty()
  approval_letter: string
}
