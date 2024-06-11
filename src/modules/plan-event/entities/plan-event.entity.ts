import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { PlanPosition } from 'src/modules/plan-position/entities/plan-position.entity'
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
  plan_position_uuid: string

  @ManyToOne(() => PlanPosition, (plan) => plan.plan_position_events)
  @JoinColumn({ name: 'plan_position_uuid', referencedColumnName: 'plan_position_uuid' })
  @ApiProperty()
  plan_position: PlanPosition

  @Column()
  @ApiProperty()
  user_uuid: string

  @ManyToOne(() => User, (user) => user.plan_events)
  @JoinColumn({ name: 'user_uuid', referencedColumnName: 'user_uuid' })
  @ApiProperty()
  user: User
}
