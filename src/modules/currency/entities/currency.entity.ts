import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { LimitValue } from 'src/modules/limit/entities/limit-value.entity'
import { Purchase } from 'src/modules/purchase/entities/purchase.entity'
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'

@Entity({ name: 'Currencies' })
export class Currency extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  currency_code: string

  @Column()
  @ApiProperty()
  currency_name: string

  @OneToMany(() => LimitValue, (limitValue) => limitValue.currency, { cascade: true })
  limit_values: LimitValue[]

  @OneToMany(() => Purchase, (purchase) => purchase.currency, { cascade: true })
  purchases: Purchase[]
}
