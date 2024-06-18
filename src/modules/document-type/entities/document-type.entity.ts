import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Document } from 'src/modules/document/entities/document.entity'
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'

@Entity({ name: 'DocumentTypes' })
export class DocumentType extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  document_type_id: number

  @Column()
  @ApiProperty()
  document_type_name: string

  @OneToMany(() => Document, (document) => document.document_type, {
    cascade: true,
  })
  documents: Document[]
}
