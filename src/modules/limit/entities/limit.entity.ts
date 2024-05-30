import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Currency } from 'src/modules/currency/entities/currency.entity'
import { LimitEvent } from 'src/modules/limit-event/entities/limit-event.entity'
import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne, OneToMany } from 'typeorm'

@Entity({ name: 'Limits' })
export class Limit extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  limit_uuid: string

  @Column()
  @ApiProperty()
  limit_name: string

  @Column()
  @ApiProperty()
  line_code: string

  @Column()
  @ApiProperty()
  kbk_code: string

  @Column()
  @ApiProperty()
  kosgu: string

  @Column({ type: 'decimal' })
  @ApiProperty()
  current_year_rub_value: number

  @Column({ type: 'decimal', nullable: true })
  @ApiProperty({ required: false })
  current_year_currency_value?: number

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  current_year_currency_code?: string

  @ManyToOne(() => Currency, (currency) => currency.current_year_limits)
  @JoinColumn({ name: 'current_year_currency_code', referencedColumnName: 'currency_code' })
  @ApiProperty()
  current_year_currency: Currency

  @Column({ type: 'decimal' })
  @ApiProperty()
  first_year_rub_value: number

  @Column({ type: 'decimal', nullable: true })
  @ApiProperty({ required: false })
  first_year_currency_value?: number

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  first_year_currency_code?: string

  @ManyToOne(() => Currency, (currency) => currency.first_year_limits)
  @JoinColumn({ name: 'first_year_currency_code', referencedColumnName: 'currency_code' })
  @ApiProperty()
  first_year_currency: Currency

  @Column({ type: 'decimal' })
  @ApiProperty()
  second_year_rub_value: number

  @Column({ type: 'decimal', nullable: true })
  @ApiProperty({ required: false })
  second_year_currency_value?: number

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  second_year_currency_code?: string

  @ManyToOne(() => Currency, (currency) => currency.second_year_limits)
  @JoinColumn({ name: 'second_year_currency_code', referencedColumnName: 'currency_code' })
  @ApiProperty()
  second_year_currency: Currency

  @OneToMany(() => LimitEvent, (limitEvent) => limitEvent.limit, { cascade: true })
  limit_events: LimitEvent[]
}
