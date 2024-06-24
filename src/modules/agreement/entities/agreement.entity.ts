import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { AgreementStatus } from 'src/modules/agreement-status/entities/agreement-status.entity'
import { AppEntity } from 'src/modules/entity/entities/app-entity.entity'
import { RoleAgreement } from 'src/modules/role-agreement/entities/role-agreement.entity'
import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm'

@Entity({ name: 'Agreements' })
export class Agreement extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  agreement_uuid: string

  @Column()
  @ApiProperty()
  role_agreement_uuid: string

  @ManyToOne(() => RoleAgreement, (roleAgreement) => roleAgreement.agreements)
  @JoinColumn({ name: 'role_agreement_uuid', referencedColumnName: 'role_agreement_uuid' })
  @ApiProperty()
  role_agreement: RoleAgreement

  @Column()
  @ApiProperty()
  agreement_status_id: number

  @ManyToOne(() => AgreementStatus, (roleAgreement) => roleAgreement.agreements)
  @JoinColumn({ name: 'agreement_status_id', referencedColumnName: 'agreement_status_id' })
  @ApiProperty()
  agreement_status: AgreementStatus

  @Column()
  @ApiProperty()
  document_uuid: string

  @Column()
  @ApiProperty()
  entity_id: number

  @ManyToOne(() => AppEntity, (entity) => entity.agreements)
  @JoinColumn({ name: 'entity_id', referencedColumnName: 'entity_id' })
  @ApiProperty()
  entity: AppEntity
}
