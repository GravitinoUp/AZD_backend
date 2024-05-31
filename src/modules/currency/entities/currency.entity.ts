import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Limit } from 'src/modules/limit/entities/limit.entity'
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'

@Entity({ name: 'Currencies' })
export class Currency extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  currency_code: string

  @Column()
  @ApiProperty()
  currency_name: string

  @OneToMany(() => Limit, (limit) => limit.current_year_currency, { cascade: true })
  current_year_limits: Limit[]

  @OneToMany(() => Limit, (limit) => limit.first_year_currency, { cascade: true })
  first_year_limits: Limit[]

  @OneToMany(() => Limit, (limit) => limit.second_year_currency, { cascade: true })
  second_year_limits: Limit[]
}
