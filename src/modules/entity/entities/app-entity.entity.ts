import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { AgreementStatus } from 'src/modules/agreement-status/entities/agreement-status.entity'
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'

@Entity({ name: 'Entities' })
export class AppEntity extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  entity_id: number

  @Column()
  @ApiProperty()
  entity_name: string

  @OneToMany(() => AgreementStatus, (agreementStatus) => agreementStatus.entity, { cascade: true })
  agreement_statuses: AgreementStatus[]
}
