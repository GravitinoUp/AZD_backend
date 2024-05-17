import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Person } from 'src/modules/person/entities/person.entity'
import { Role } from 'src/modules/role/entities/role.entity'
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm'

@Entity({ name: 'Users' })
export class User extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  user_uuid: string

  @Column()
  @ApiProperty()
  person_uuid: string

  @ManyToOne(() => Person, (person) => person.person_uuid)
  @JoinColumn({ name: 'person_uuid', referencedColumnName: 'person_uuid' })
  @ApiProperty()
  person: Person

  @Column()
  @ApiProperty()
  role_id: number

  @ManyToOne(() => Role, (role) => role.role_id)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'role_id' })
  @ApiProperty()
  role: Role

  @Column({ default: true })
  @ApiProperty()
  is_active: boolean

  @Column()
  @ApiProperty()
  email: string

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  phone?: string

  @Column()
  @ApiProperty()
  password: string

  // @OneToMany(() => Auth, (auth) => auth.user, { cascade: true, eager: true })
  // auths: Auth[]
}
