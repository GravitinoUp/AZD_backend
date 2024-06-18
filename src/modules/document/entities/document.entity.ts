import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { DocumentType } from 'src/modules/document-type/entities/document-type.entity'
import { Organization } from 'src/modules/organization/entities/organization.entity'
import { Person } from 'src/modules/person/entities/person.entity'
import { Purchase } from 'src/modules/purchase/entities/purchase.entity'
import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm'

@Entity({ name: 'Documents' })
export class Document extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  document_uuid: string

  @Column()
  @ApiProperty()
  document_type_id: number

  @ManyToOne(() => DocumentType, (type) => type.documents)
  @JoinColumn({ name: 'document_type_id', referencedColumnName: 'document_type_id' })
  @ApiProperty()
  document_type: DocumentType

  @Column()
  @ApiProperty()
  document_name: string

  @Column()
  @ApiProperty()
  purchase_uuid: string

  @ManyToOne(() => Purchase, (purchase) => purchase.documents)
  @JoinColumn({ name: 'purchase_uuid', referencedColumnName: 'purchase_uuid' })
  @ApiProperty()
  purchase: Purchase

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  executor_uuid?: string

  @ManyToOne(() => Organization, (organization) => organization.executor_documents)
  @JoinColumn({ name: 'executor_uuid', referencedColumnName: 'organization_uuid' })
  @ApiProperty()
  executor?: Organization

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  executor_person_uuid?: string

  @ManyToOne(() => Person, (person) => person.executor_documents)
  @JoinColumn({ name: 'executor_person_uuid', referencedColumnName: 'person_uuid' })
  @ApiProperty({ required: false })
  executor_person: Person

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  customer_uuid?: string

  @ManyToOne(() => Organization, (organization) => organization.customer_documents)
  @JoinColumn({ name: 'customer_uuid', referencedColumnName: 'organization_uuid' })
  @ApiProperty({ required: false })
  customer?: Organization

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  customer_person_uuid?: string

  @ManyToOne(() => Person, (person) => person.customer_documents)
  @JoinColumn({ name: 'customer_person_uuid', referencedColumnName: 'person_uuid' })
  @ApiProperty({ required: false })
  customer_person?: Person
}
