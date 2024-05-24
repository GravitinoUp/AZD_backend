import { Field, ObjectType } from '@nestjs/graphql'
import BaseModel from 'src/common/model'
import { LegalBasis } from 'src/modules/legal-basis/entities/legal-basis.entity'
import { Organization } from 'src/modules/organization/entities/organization.entity'
import { User } from 'src/modules/user/entities/user.entity'
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm'

@ObjectType()
@Entity({ name: 'People' })
export class Person extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  person_uuid: string

  @Column()
  @Field()
  last_name: string

  @Column()
  @Field()
  first_name: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  patronymic?: string

  @Column()
  @Field()
  post: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  legal_basis_uuid: string

  @ManyToOne(() => LegalBasis, (basis) => basis.people)
  @JoinColumn({ name: 'legal_basis_uuid', referencedColumnName: 'legal_basis_uuid' })
  @Field()
  legal_basis: LegalBasis

  @OneToMany(() => User, (user) => user.person, { cascade: true })
  users: User[]

  @OneToMany(() => Organization, (organization) => organization.contact_person, { cascade: true })
  organizations: Organization[]
}
