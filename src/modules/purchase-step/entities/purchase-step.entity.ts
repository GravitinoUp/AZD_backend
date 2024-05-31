import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Purchase } from 'src/modules/purchase/entities/purchase.entity'
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'

@Entity({ name: 'PurchaseSteps' })
export class PurchaseStep extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  purchase_step_id: number

  @Column()
  @ApiProperty()
  purchase_step_name: string

  @OneToMany(() => Purchase, (purchase) => purchase.purchase_step, { cascade: true })
  purchases: Purchase[]
}
