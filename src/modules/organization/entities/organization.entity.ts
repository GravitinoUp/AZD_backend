import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { OrganizationType } from 'src/modules/organization-type/entities/organization-type.entity'
import { Person } from 'src/modules/person/entities/person.entity'
import { Plan } from 'src/modules/plan/entities/plan.entity'
import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne, OneToMany } from 'typeorm'

@Entity({ name: 'Organizations' })
export class Organization extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  organization_uuid: string

  @Column()
  @ApiProperty()
  organization_type_id: number

  @ManyToOne(() => OrganizationType, (type) => type.organizations)
  @JoinColumn({ name: 'organization_type_id', referencedColumnName: 'organization_type_id' })
  @ApiProperty()
  organization_type: OrganizationType

  @Column()
  @ApiProperty()
  contact_person_uuid: string

  @ManyToOne(() => Person, (person) => person.organizations)
  @JoinColumn({ name: 'contact_person_uuid', referencedColumnName: 'person_uuid' })
  @ApiProperty()
  contact_person: Person

  @Column()
  @ApiProperty()
  full_name: string

  @Column()
  @ApiProperty()
  short_name: string

  @Column()
  @ApiProperty()
  register_number: string

  @Column()
  @ApiProperty()
  bic: string

  @Column()
  @ApiProperty()
  address: string

  @Column()
  @ApiProperty()
  mail_address: string

  @Column()
  @ApiProperty()
  phone: string

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  fax?: string

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  email?: string

  @Column()
  @ApiProperty()
  ogrn: string

  @Column()
  @ApiProperty()
  inn: string

  @Column()
  @ApiProperty()
  kpp: string

  @Column()
  @ApiProperty()
  okpo: string

  @Column()
  @ApiProperty()
  region: string

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ required: false })
  additional_info?: string

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  web_site?: string

  @OneToMany(() => Plan, (plan) => plan.branch, { cascade: true })
  plans: Plan[]
}
