import { Field, Int, ObjectType } from '@nestjs/graphql'
import BaseModel from 'src/common/model'
import { Organization } from 'src/modules/organization/entities/organization.entity'
import { PlanWay } from 'src/modules/plan-way/entities/plan-way.entity'
import { User } from 'src/modules/user/entities/user.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

@ObjectType()
@Entity({ name: 'Plans' })
export class Plan extends BaseModel {
  @PrimaryColumn()
  @Field()
  plan_uuid: string

  @Column()
  @Field()
  user_uuid: string

  @ManyToOne(() => User, (user) => user.plans)
  @JoinColumn({ name: 'user_uuid', referencedColumnName: 'user_uuid' })
  @Field(() => User)
  user: User

  @Column({ nullable: true })
  @Field({ nullable: true })
  purchase_offer_number?: string

  @Column()
  @Field()
  okpd_uuid: string // TODO UUID

  @Column()
  @Field()
  object_name: string

  @Column()
  @Field()
  okei_uuid: string // TODO UUID

  @Column()
  @Field()
  result_name: string

  @Column()
  @Field()
  npa_date: Date

  @Column()
  @Field()
  npa_number: string

  @Column({ default: 0 })
  @Field(() => Int)
  current_year_plan_count: number

  @Column({ type: 'decimal', default: 0 })
  @Field()
  current_year_plan_avg_price: number

  @Column({ default: 0 })
  @Field(() => Int)
  first_year_plan_count: number

  @Column({ type: 'decimal', default: 0 })
  @Field()
  first_year_plan_avg_price: number

  @Column({ default: 0 })
  @Field(() => Int)
  second_year_plan_count: number

  @Column({ type: 'decimal', default: 0 })
  @Field()
  second_year_plan_avg_price: number

  @Column({ default: 0 })
  @Field(() => Int)
  next_years_plan_count: number

  @Column({ type: 'decimal', default: 0 })
  @Field()
  next_years_plan_avg_price: number

  @Column({ type: 'decimal', default: 0 })
  @Field()
  current_year_limit: number

  @Column({ type: 'decimal', default: 0 })
  @Field()
  first_year_limit: number

  @Column({ type: 'decimal', default: 0 })
  @Field()
  second_year_limit: number

  @Column({ type: 'decimal', default: 0 })
  @Field()
  next_years_limit: number

  @Column({ type: 'decimal', default: 0 })
  @Field()
  start_max_price: number

  @Column()
  @Field()
  public_purchase_discussion: boolean

  @Column({ nullable: true })
  @Field({ nullable: true })
  authorized_institution?: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  organizer_name?: string

  @Column()
  @Field()
  placement_month: string

  @Column()
  @Field(() => Int)
  way_id: number

  @ManyToOne(() => PlanWay, (way) => way.plans)
  @JoinColumn({ name: 'way_id', referencedColumnName: 'way_id' })
  @Field(() => PlanWay)
  way: PlanWay

  @Column()
  @Field()
  small_business: boolean

  @Column()
  @Field()
  initiator: string

  @Column()
  @Field()
  branch_uuid: string

  @ManyToOne(() => Organization, (organization) => organization.plans)
  @JoinColumn({ name: 'branch_uuid', referencedColumnName: 'organization_uuid' })
  @Field(() => Organization)
  branch: Organization

  @Column({ type: 'decimal', nullable: true })
  @Field({ nullable: true })
  price_value?: number

  @Column({ type: 'decimal', nullable: true })
  @Field({ nullable: true })
  savings?: number

  @Column({ nullable: true })
  @Field({ nullable: true })
  contract_number?: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  contract_date?: Date

  @Column({ nullable: true })
  @Field({ nullable: true })
  contragent?: string

  @Column()
  @Field()
  approval_letter: string
}
