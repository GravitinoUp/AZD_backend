import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { KBKValue } from './kbk-value.entity'
import { Limit } from 'src/modules/limit/entities/limit.entity'

@Entity({ name: 'KBK' })
export class KBK extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  kbk_uuid: string

  @Column()
  @ApiProperty()
  kbk_name: string

  @Column()
  @ApiProperty()
  kbk_section_uuid: string

  @ManyToOne(() => KBKValue, (value) => value.kbk_sections)
  @JoinColumn({ name: 'kbk_section_uuid', referencedColumnName: 'kbk_value_uuid' })
  @ApiProperty()
  kbk_section: KBKValue

  @Column()
  @ApiProperty()
  kbk_target_article_uuid: string

  @ManyToOne(() => KBKValue, (value) => value.kbk_target_articles)
  @JoinColumn({ name: 'kbk_target_article_uuid', referencedColumnName: 'kbk_value_uuid' })
  @ApiProperty()
  kbk_target_article: KBKValue

  @Column()
  @ApiProperty()
  kbk_expenses_type_uuid: string

  @ManyToOne(() => KBKValue, (value) => value.kbk_expenses_types)
  @JoinColumn({ name: 'kbk_expenses_type_uuid', referencedColumnName: 'kbk_value_uuid' })
  @ApiProperty()
  kbk_expenses_type: KBKValue

  @OneToMany(() => Limit, (limit) => limit.kbk, { cascade: true })
  limits: Limit[]
}
