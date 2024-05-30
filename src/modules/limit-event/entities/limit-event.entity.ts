import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Limit } from 'src/modules/limit/entities/limit.entity'
import { User } from 'src/modules/user/entities/user.entity'
import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm'

@Entity({ name: 'LimitEvents' })
export class LimitEvent extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  limit_event_uuid: string

  @Column()
  @ApiProperty()
  limit_event_name: string

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  old_value?: string

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  new_value?: string

  @Column()
  @ApiProperty()
  limit_uuid: string

  @ManyToOne(() => Limit, (limit) => limit.limit_events)
  @JoinColumn({ name: 'limit_uuid', referencedColumnName: 'limit_uuid' })
  @ApiProperty()
  limit: Limit

  @Column()
  @ApiProperty()
  user_uuid: string

  @ManyToOne(() => User, (user) => user.limit_events)
  @JoinColumn({ name: 'user_uuid', referencedColumnName: 'user_uuid' })
  @ApiProperty()
  user: User
}
