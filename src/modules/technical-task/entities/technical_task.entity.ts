import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Purchase } from 'src/modules/purchase/entities/purchase.entity'
import { User } from 'src/modules/user/entities/user.entity'
import { Entity, Column, PrimaryColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm'

@Entity({ name: 'TechnicalTasks' })
export class TechnicalTask extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  technical_task_uuid: string

  @Column()
  @ApiProperty()
  purchase_uuid: string

  @ManyToOne(() => Purchase, (purchase) => purchase.technical_tasks)
  @JoinColumn({ name: 'purchase_uuid', referencedColumnName: 'purchase_uuid' })
  @ApiProperty()
  purchase: Purchase

  @Column({ type: 'json' })
  @ApiProperty()
  data_json: string

  @OneToMany(() => User, (user) => user.role, { cascade: true })
  users: User[]
}
