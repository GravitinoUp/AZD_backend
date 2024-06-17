import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { PlanPosition } from 'src/modules/plan-position/entities/plan-position.entity'
import { Product } from 'src/modules/product/entities/product.entity'
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'

@Entity({ name: 'OKEI' })
export class Okei extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  okei_uuid: string

  @Column()
  okei_code: string

  @Column({ type: 'text' })
  @ApiProperty()
  okei_full_name: string

  @Column({ type: 'json' })
  @ApiProperty()
  okei_short_name: string

  @OneToMany(() => PlanPosition, (plan) => plan.okei, { cascade: true })
  plan_positions: PlanPosition[]

  @OneToMany(() => Product, (product) => product.okei, { cascade: true })
  products: Product[]
}
