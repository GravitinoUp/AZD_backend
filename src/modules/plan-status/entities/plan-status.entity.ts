import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Plan } from 'src/modules/plan/entities/plan.entity'
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'

@Entity({ name: 'PlanStatuses' })
export class PlanStatus extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  plan_status_id: number

  @Column()
  @ApiProperty()
  plan_status_name: string

  @OneToMany(() => Plan, (plan) => plan.plan_status, { cascade: true })
  plans: Plan[]
}
