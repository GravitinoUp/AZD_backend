import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Limit } from 'src/modules/limit/entities/limit.entity'
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'

@Entity({ name: 'LimitStatuses' })
export class LimitStatus extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  limit_status_id: number

  @Column()
  @ApiProperty()
  limit_status_name: string

  @OneToMany(() => Limit, (limit) => limit.limit_status, { cascade: true })
  limits: Limit[]
}
