import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Branch } from 'src/modules/branch/entities/branch.entity'
import { Currency } from 'src/modules/currency/entities/currency.entity'
import { KBK } from 'src/modules/kbk/entities/kbk.entity'
import { Kosgu } from 'src/modules/kosgu/entities/kosgu.entity'
import { LimitEvent } from 'src/modules/limit-event/entities/limit-event.entity'
import { LimitStatus } from 'src/modules/limit-status/entities/limit-status.entity'
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
  kbk_uuid: string

  @ManyToOne(() => KBK, (kbk) => kbk.limits)
  @JoinColumn({ name: 'kbk_uuid', referencedColumnName: 'kbk_uuid' })
  @ApiProperty()
  kbk: KBK

  @Column()
  @ApiProperty()
  kosgu_uuid: string

  @ManyToOne(() => Kosgu, (kosgu) => kosgu.limits)
  @JoinColumn({ name: 'kosgu_uuid', referencedColumnName: 'kosgu_uuid' })
  @ApiProperty()
  kosgu: Kosgu

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  limit_version?: number

  @Column()
  @ApiProperty()
  limit_status_id: number

  @ManyToOne(() => LimitStatus, (limit) => limit.limits)
  @JoinColumn({ name: 'limit_status_id', referencedColumnName: 'limit_status_id' })
  @ApiProperty()
  limit_status: LimitStatus

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

  @Column()
  @ApiProperty()
  branch_uuid: string

  @ManyToOne(() => Branch, (branch) => branch.limits)
  @JoinColumn({ name: 'branch_uuid', referencedColumnName: 'branch_uuid' })
  @ApiProperty()
  branch: Branch

  @OneToMany(() => LimitEvent, (limitEvent) => limitEvent.limit, { cascade: true })
  limit_events: LimitEvent[]
}
