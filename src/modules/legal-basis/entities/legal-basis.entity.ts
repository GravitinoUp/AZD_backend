import { Field, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Person } from 'src/modules/person/entities/person.entity'
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'

@ObjectType()
@Entity({ name: 'LegalBasis' })
export class LegalBasis extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  @Field()
  legal_basis_uuid: string

  @Column()
  @ApiProperty()
  @Field()
  legal_basis_name: string

  @Column()
  @ApiProperty()
  @Field()
  legal_basis_number: string

  @Column()
  @ApiProperty()
  @Field()
  legal_basis_date: Date

  @OneToMany(() => Person, (person) => person.legal_basis, { cascade: true })
  people: Person[]
}
