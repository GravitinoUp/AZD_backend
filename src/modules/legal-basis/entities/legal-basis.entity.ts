import { Field, ObjectType } from '@nestjs/graphql'
import BaseModel from 'src/common/model'
import { Person } from 'src/modules/person/entities/person.entity'
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'

@ObjectType()
@Entity({ name: 'LegalBasis' })
export class LegalBasis extends BaseModel {
  @PrimaryColumn()
  @Field()
  legal_basis_uuid: string

  @Column()
  @Field()
  legal_basis_name: string

  @Column()
  @Field()
  legal_basis_number: string

  @Column()
  @Field()
  legal_basis_date: Date

  @OneToMany(() => Person, (person) => person.legal_basis, { cascade: true })
  people: Person[]
}
