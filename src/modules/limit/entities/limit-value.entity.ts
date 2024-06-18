import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Limit } from './limit.entity'
import { Currency } from 'src/modules/currency/entities/currency.entity'

@Entity({ name: 'LimitValues' })
export class LimitValue extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  limit_value_uuid: string

  @Column()
  @ApiProperty()
  limit_uuid: string

  @ManyToOne(() => Limit, (limit) => limit.years)
  @JoinColumn({ name: 'limit_uuid', referencedColumnName: 'limit_uuid' })
  @ApiProperty()
  limit: Limit

  @Column()
  @ApiProperty()
  limit_value_year: number

  @Column({ type: 'decimal' })
  @ApiProperty()
  rub_value: number

  @Column({ type: 'decimal', nullable: true })
  @ApiProperty({ required: false })
  currency_value?: number

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  currency_code?: string

  @ManyToOne(() => Currency, (currency) => currency.limit_values)
  @JoinColumn({ name: 'currency_code', referencedColumnName: 'currency_code' })
  @ApiProperty()
  currency: Currency
}
