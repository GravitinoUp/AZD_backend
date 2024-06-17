import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'PurchaseProducts' })
export class PurchaseProduct extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  purchase_product_uuid: string

  @Column({ type: 'uuid' })
  @ApiProperty()
  purchase_uuid: string

  @Column({ type: 'uuid' })
  @ApiProperty()
  product_uuid: string

  @Column()
  @ApiProperty()
  quantity: number
}
