import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Agreement } from 'src/modules/agreement/entities/agreement-status.entity'
import { AppEntity } from 'src/modules/entity/entities/app-entity.entity'
import { Permission } from 'src/modules/permission/entities/permission.entity'
import { Role } from 'src/modules/role/entities/role.entity'
import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne, OneToMany } from 'typeorm'

@Entity({ name: 'RoleAgreements' })
export class RoleAgreement extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  role_agreement_uuid: string

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  parent_role_id?: number

  @ManyToOne(() => Role, (role) => role.parent_role_agreements)
  @JoinColumn({ name: 'parent_role_id', referencedColumnName: 'role_id' })
  @ApiProperty({ required: false })
  parent_role?: Role

  @Column()
  @ApiProperty()
  role_id: number

  @ManyToOne(() => Role, (role) => role.role_agreements)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'role_id' })
  @ApiProperty()
  role: Role

  @Column()
  @ApiProperty()
  permission_id: string

  @ManyToOne(() => Permission, (permission) => permission.role_agreements)
  @JoinColumn({ name: 'permission_id', referencedColumnName: 'permission_id' })
  @ApiProperty()
  permission: Permission

  @Column()
  @ApiProperty()
  entity_id: number

  @ManyToOne(() => AppEntity, (entity) => entity.role_agreements)
  @JoinColumn({ name: 'entity_id', referencedColumnName: 'entity_id' })
  @ApiProperty()
  entity: AppEntity

  @OneToMany(() => Agreement, (agreement) => agreement.role_agreement, { cascade: true })
  agreements: Agreement[]
}
