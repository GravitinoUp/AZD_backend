import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'
import { KBKValue } from './kbk-value.entity'

@Entity({ name: 'KBKTypes' })
export class KBKType extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  kbk_type_id: number

  @Column()
  @ApiProperty()
  kbk_type_name: string

  @OneToMany(() => KBKValue, (value) => value.kbk_type, { cascade: true })
  kbk_values: KBKValue[]
}
