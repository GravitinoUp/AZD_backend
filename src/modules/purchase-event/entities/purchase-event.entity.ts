import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Purchase } from 'src/modules/purchase/entities/purchase.entity'
import { User } from 'src/modules/user/entities/user.entity'
import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm'

@Entity({ name: 'PurchaseEvents' })
export class PurchaseEvent extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  purchase_event_uuid: string

  @Column()
  @ApiProperty()
  purchase_event_name: string

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  old_value?: string

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  new_value?: string

  @Column()
  @ApiProperty()
  purchase_uuid: string

  @ManyToOne(() => Purchase, (purchase) => purchase.purchase_events)
  @JoinColumn({ name: 'purchase_uuid', referencedColumnName: 'purchase_uuid' })
  @ApiProperty()
  purchase: Purchase

  @Column()
  @ApiProperty()
  user_uuid: string

  @ManyToOne(() => User, (user) => user.purchase_events)
  @JoinColumn({ name: 'user_uuid', referencedColumnName: 'user_uuid' })
  @ApiProperty()
  user: User
}
