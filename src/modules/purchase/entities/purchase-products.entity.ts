import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Purchase } from './purchase.entity'
import { Product } from 'src/modules/product/entities/product.entity'

@Entity({ name: 'PurchaseProducts' })
export class PurchaseProduct extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  purchase_product_uuid: string

  @Column({ type: 'uuid' })
  @ApiProperty()
  purchase_uuid: string

  @ManyToOne(() => Purchase, (purchase) => purchase.purchase_products)
  @JoinColumn({ name: 'purchase_uuid', referencedColumnName: 'purchase_uuid' })
  @ApiProperty()
  purchase: Purchase

  @Column({ type: 'uuid' })
  @ApiProperty()
  product_uuid: string

  @ManyToOne(() => Product, (product) => product.purchase_products)
  @JoinColumn({ name: 'product_uuid', referencedColumnName: 'product_uuid' })
  @ApiProperty()
  product: Product

  @Column()
  @ApiProperty()
  quantity: number
}
