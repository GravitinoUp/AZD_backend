import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Limit } from 'src/modules/limit/entities/limit.entity'
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'

@Entity({ name: 'Kosgu' })
export class Kosgu extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  kosgu_uuid: string

  @Column()
  @ApiProperty()
  kosgu_code: string

  @Column()
  @ApiProperty()
  kosgu_name: string

  @OneToMany(() => Limit, (limit) => limit.kosgu, { cascade: true })
  limits: Limit[]
}
