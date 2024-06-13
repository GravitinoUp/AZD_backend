import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Branch } from 'src/modules/branch/entities/branch.entity'
import { PlanStatus } from 'src/modules/plan-status/entities/plan-status.entity'
import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm'

@Entity({ name: 'Plans' })
export class Plan extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  plan_uuid: string

  @Column()
  @ApiProperty()
  plan_number: number

  @Column()
  @ApiProperty()
  plan_status_id: number

  @ManyToOne(() => PlanStatus, (plan_status) => plan_status.plans)
  @JoinColumn({ name: 'plan_status_id', referencedColumnName: 'plan_status_id' })
  @ApiProperty()
  plan_status: PlanStatus

  @Column({ default: 1 })
  @ApiProperty()
  plan_version: number

  @Column()
  @ApiProperty()
  branch_uuid: string

  @ManyToOne(() => Branch, (branch) => branch.plans)
  @JoinColumn({ name: 'branch_uuid', referencedColumnName: 'branch_uuid' })
  @ApiProperty()
  branch: Branch
}
