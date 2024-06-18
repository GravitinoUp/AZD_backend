import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { AppEntity } from 'src/modules/entity/entities/app-entity.entity'
import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm'

@Entity({ name: 'AgreementStatuses' })
export class AgreementStatus extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  agreement_status_id: number

  @Column()
  @ApiProperty()
  agreement_status_name: string

  @Column()
  @ApiProperty()
  entity_id: number

  @ManyToOne(() => AppEntity, (entity) => entity.agreement_statuses)
  @JoinColumn({ name: 'entity_id', referencedColumnName: 'entity_id' })
  @ApiProperty()
  entity: AppEntity
}
