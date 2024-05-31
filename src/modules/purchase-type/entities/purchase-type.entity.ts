import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity({ name: 'PurchaseTypes' })
export class PurchaseType extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  purchase_type_id: number

  @Column()
  @ApiProperty()
  purchase_type_name: string

  // @OneToMany(() => Purchase, (purchase) => purchase.purchase_type, { cascade: true })
  // purchases: Purchase[]
}
