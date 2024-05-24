import { Field, Int, ObjectType } from '@nestjs/graphql'
import BaseModel from 'src/common/model'
import { Organization } from 'src/modules/organization/entities/organization.entity'
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'

@ObjectType()
@Entity({ name: 'OrganizationTypes' })
export class OrganizationType extends BaseModel {
  @PrimaryColumn()
  @Field(() => Int)
  organization_type_id: number

  @Column()
  @Field()
  organization_type_name: string

  @OneToMany(() => Organization, (organization) => organization.organization_type, {
    cascade: true,
    eager: true,
  })
  organizations: Organization[]
}
