import { ApiProperty } from '@nestjs/swagger'
import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm'
import BaseModel from 'src/common/model'
import { Plan } from 'src/modules/plan/entities/plan.entity'
import { Limit } from 'src/modules/limit/entities/limit.entity'
import { AppStrings } from 'src/common/constants/strings'

@Entity({ name: 'Branches' })
export class Branch extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  branch_uuid: string

  @Column()
  @ApiProperty()
  branch_name: string

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  branch_address: string

  @Column({ type: 'uuid', array: true })
  @ApiProperty({ description: AppStrings.PROPERTY_VALUES })
  property_values: string[]

  @OneToMany(() => Plan, (plan) => plan.branch, { cascade: true })
  plans: Plan[]

  @OneToMany(() => Limit, (limit) => limit.branch, { cascade: true })
  limits: Limit[]
}
