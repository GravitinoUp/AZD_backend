import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Plan } from 'src/modules/plan/entities/plan.entity'
import { User } from 'src/modules/user/entities/user.entity'
import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm'

@Entity({ name: 'PlanEvents' })
export class PlanEvent extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  plan_event_uuid: string

  @Column()
  @ApiProperty()
  plan_event_name: string

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  old_value?: string

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  new_value?: string

  @Column()
  @ApiProperty()
  plan_uuid: string

  @ManyToOne(() => Plan, (plan) => plan.plan_events)
  @JoinColumn({ name: 'plan_uuid', referencedColumnName: 'plan_uuid' })
  @ApiProperty()
  plan: Plan

  @Column()
  @ApiProperty()
  user_uuid: string

  @ManyToOne(() => User, (user) => user.plan_events)
  @JoinColumn({ name: 'user_uuid', referencedColumnName: 'user_uuid' })
  @ApiProperty()
  user: User
}
