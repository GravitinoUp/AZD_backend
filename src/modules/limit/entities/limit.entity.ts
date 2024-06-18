import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Branch } from 'src/modules/branch/entities/branch.entity'
import { KBK } from 'src/modules/kbk/entities/kbk.entity'
import { Kosgu } from 'src/modules/kosgu/entities/kosgu.entity'
import { LimitEvent } from 'src/modules/limit-event/entities/limit-event.entity'
import { LimitStatus } from 'src/modules/limit-status/entities/limit-status.entity'
import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { LimitValue } from './limit-value.entity'

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

  @Column()
  @ApiProperty()
  branch_uuid: string

  @ManyToOne(() => Branch, (branch) => branch.limits)
  @JoinColumn({ name: 'branch_uuid', referencedColumnName: 'branch_uuid' })
  @ApiProperty()
  branch: Branch

  @OneToMany(() => LimitEvent, (limitEvent) => limitEvent.limit, { cascade: true })
  limit_events: LimitEvent[]

  @OneToMany(() => LimitValue, (year) => year.limit, { cascade: true })
  years: LimitValue[]
}
