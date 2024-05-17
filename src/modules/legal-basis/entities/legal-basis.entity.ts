import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity({ name: 'LegalBasis' })
export class LegalBasis extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  legal_basis_uuid: string

  @Column()
  @ApiProperty()
  legal_basis_name: string

  @Column()
  @ApiProperty()
  legal_basis_number: string

  @Column()
  @ApiProperty()
  legal_basis_date: Date

  // @OneToMany(() => User, (user) => user.role, { cascade: true, eager: true })
  // users: User[]
}
