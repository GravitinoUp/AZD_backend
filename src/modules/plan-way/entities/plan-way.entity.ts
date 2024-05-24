import { Field, ObjectType } from '@nestjs/graphql'
import BaseModel from 'src/common/model'
import { Plan } from 'src/modules/plan/entities/plan.entity'
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'

@ObjectType()
@Entity({ name: 'PlanWays' })
export class PlanWay extends BaseModel {
  @PrimaryColumn()
  @Field()
  way_id: number

  @Column()
  @Field()
  way_name: string

  @OneToMany(() => Plan, (plan) => plan.way, { cascade: true })
  plans: Plan[]
}
