import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Plan } from 'src/modules/plan/entities/plan.entity'
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'

@Entity({ name: 'PlanWays' })
export class PlanWay extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  way_id: number

  @Column()
  @ApiProperty()
  way_name: string

  @OneToMany(() => Plan, (plan) => plan.way, { cascade: true })
  plans: Plan[]
}
