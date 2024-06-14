import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { PlanPosition } from 'src/modules/plan-position/entities/plan-position.entity'
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'

@Entity({ name: 'PlanWays' })
export class PlanWay extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  way_id: number

  @Column()
  @ApiProperty()
  way_name: string

  @OneToMany(() => PlanPosition, (plan) => plan.way, { cascade: true })
  plan_positions: PlanPosition[]
}
