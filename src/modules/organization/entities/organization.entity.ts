import { Field, ObjectType } from '@nestjs/graphql'
import BaseModel from 'src/common/model'
import { OrganizationType } from 'src/modules/organization-type/entities/organization-type.entity'
import { Person } from 'src/modules/person/entities/person.entity'
import { Plan } from 'src/modules/plan/entities/plan.entity'
import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne, OneToMany } from 'typeorm'

@ObjectType()
@Entity({ name: 'Organizations' })
export class Organization extends BaseModel {
  @PrimaryColumn()
  @Field()
  organization_uuid: string

  @Column()
  @Field()
  organization_type_id: number

  @ManyToOne(() => OrganizationType, (type) => type.organizations)
  @JoinColumn({ name: 'organization_type_id', referencedColumnName: 'organization_type_id' })
  organization_type: OrganizationType

  @Column()
  @Field()
  contact_person_uuid: string

  @ManyToOne(() => Person, (person) => person.organizations)
  @JoinColumn({ name: 'contact_person_uuid', referencedColumnName: 'person_uuid' })
  contact_person: Person

  @Column()
  @Field()
  full_name: string

  @Column()
  @Field()
  short_name: string

  @Column()
  @Field()
  register_number: string

  @Column()
  @Field()
  bic: string

  @Column()
  @Field()
  address: string

  @Column()
  @Field()
  mail_address: string

  @Column()
  @Field()
  phone: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  fax?: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  email?: string

  @Column()
  @Field()
  ogrn: string

  @Column()
  @Field()
  inn: string

  @Column()
  @Field()
  kpp: string

  @Column()
  @Field()
  okpo: string

  @Column()
  @Field()
  region: string

  @Column({ type: 'text', nullable: true })
  @Field({ nullable: true })
  additional_info?: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  web_site?: string

  @OneToMany(() => Plan, (plan) => plan.branch, { cascade: true })
  plans: Plan[]
}
