import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity({ name: 'Rules' })
export class Rule extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  rule_uuid: string

  @Column()
  @ApiProperty()
  rule_name: string

  @Column()
  @ApiProperty()
  rule_field_on: string

  @Column()
  @ApiProperty()
  rule_on_operator: string

  @Column()
  @ApiProperty()
  rule_on_condition_value: string

  @Column()
  @ApiProperty({ required: false })
  rule_field_for?: string

  @Column()
  @ApiProperty({ required: false })
  rule_for_operator?: string

  @Column()
  @ApiProperty({ required: false })
  rule_for_condition_value?: string
}
