import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm'
import { KBK } from './kbk.entity'
import { KBKType } from './kbk-type.entity'

@Entity({ name: 'KBKValues' })
export class KBKValue extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  kbk_value_uuid: string

  @Column()
  @ApiProperty()
  kbk_type_id: number

  @ManyToOne(() => KBKType, (type) => type.kbk_values)
  @JoinColumn({ name: 'kbk_type_id', referencedColumnName: 'kbk_type_id' })
  @ApiProperty()
  kbk_type: KBKType

  @Column()
  @ApiProperty()
  kbk_value: string

  @OneToMany(() => KBK, (kbk) => kbk.kbk_section, { cascade: true })
  kbk_sections: KBK[]

  @OneToMany(() => KBK, (kbk) => kbk.kbk_subsection, { cascade: true })
  kbk_subsections: KBK[]

  @OneToMany(() => KBK, (kbk) => kbk.kbk_target_article, { cascade: true })
  kbk_target_articles: KBK[]

  @OneToMany(() => KBK, (kbk) => kbk.kbk_expenses_type, { cascade: true })
  kbk_expenses_types: KBK[]

  @OneToMany(() => KBK, (kbk) => kbk.kbk_name, { cascade: true })
  kbk_names: KBK[]
}
