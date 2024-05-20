import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Organization } from 'src/modules/organization/entities/organization.entity'
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'

@Entity({ name: 'OrganizationTypes' })
export class OrganizationType extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  organization_type_id: number

  @Column()
  @ApiProperty()
  organization_type_name: string

  @OneToMany(() => Organization, (organization) => organization.organization_uuid, {
    cascade: true,
    eager: true,
  })
  organizations: Organization[]
}
