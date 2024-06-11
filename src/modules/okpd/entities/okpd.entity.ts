import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { PlanPosition } from 'src/modules/plan-position/entities/plan-position.entity'
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'

@Entity({ name: 'OKPD2' })
export class Okpd extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  okpd_uuid: string

  @ApiProperty()
  okpd_code: string

  @Column()
  @ApiProperty()
  okpd_name: string

  @Column({ type: 'json' })
  @ApiProperty()
  okpd_data_json: string

  @OneToMany(() => PlanPosition, (plan) => plan.okpd, { cascade: true })
  plan_positions: PlanPosition[]
}
