import { ApiProperty } from '@nestjs/swagger'
import { AppStrings } from 'src/common/constants/strings'
import BaseModel from 'src/common/model'
import { Okei } from 'src/modules/okei/entities/okei.entity'
import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm'

@Entity({ name: 'Products' })
export class Product extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  product_uuid: string

  @Column({ type: 'text' })
  @ApiProperty()
  product_name: string

  @Column({ type: 'text' })
  @ApiProperty()
  product_description: string

  @Column({ type: 'decimal' })
  @ApiProperty()
  product_price: number

  @Column()
  @ApiProperty({ description: AppStrings.PLAN_OKEI })
  okei_uuid: string

  @ManyToOne(() => Okei, (okei) => okei.products)
  @JoinColumn({ name: 'okei_uuid', referencedColumnName: 'okei_uuid' })
  @ApiProperty()
  okei: Okei
}
