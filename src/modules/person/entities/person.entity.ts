import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Document } from 'src/modules/document/entities/document.entity'
import { LegalBasis } from 'src/modules/legal-basis/entities/legal-basis.entity'
import { Organization } from 'src/modules/organization/entities/organization.entity'
import { User } from 'src/modules/user/entities/user.entity'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm'

@Entity({ name: 'People' })
export class Person extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  person_uuid: string

  @Column()
  @ApiProperty()
  last_name: string

  @Column()
  @ApiProperty()
  first_name: string

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  patronymic?: string

  @Column()
  @ApiProperty()
  post: string

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  legal_basis_uuid: string

  @ManyToOne(() => LegalBasis, (basis) => basis.people)
  @JoinColumn({ name: 'legal_basis_uuid', referencedColumnName: 'legal_basis_uuid' })
  @ApiProperty()
  legal_basis: LegalBasis

  @OneToOne(() => User, (user) => user.person, { cascade: true })
  user: User

  @OneToMany(() => Organization, (organization) => organization.contact_person, { cascade: true })
  organizations: Organization[]

  @OneToMany(() => Document, (document) => document.executor_person, {
    cascade: true,
  })
  executor_documents: Document[]

  @OneToMany(() => Document, (document) => document.customer_person, {
    cascade: true,
  })
  customer_documents: Document[]
}
