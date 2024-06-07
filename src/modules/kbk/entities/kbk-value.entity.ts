import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'
import { KBK } from './kbk.entity'

@Entity({ name: 'KBKValues' })
export class KBKValue extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  kbk_value_uuid: string

  @Column()
  @ApiProperty()
  kbk_type: string

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
}
