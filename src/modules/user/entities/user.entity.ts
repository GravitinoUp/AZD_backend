import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Auth } from 'src/modules/auth/entities/auth.entity'
import { Person } from 'src/modules/person/entities/person.entity'
import { Plan } from 'src/modules/plan/entities/plan.entity'
import { RolePermission } from 'src/modules/role-permission/entities/role-permission.entity'
import { Role } from 'src/modules/role/entities/role.entity'
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm'

@Entity({ name: 'Users' })
export class User extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  user_uuid: string

  @Column()
  @ApiProperty()
  person_uuid: string

  @ManyToOne(() => Person, (person) => person.users)
  @JoinColumn({ name: 'person_uuid', referencedColumnName: 'person_uuid' })
  @ApiProperty()
  person: Person

  @Column()
  @ApiProperty()
  role_id: number

  @ManyToOne(() => Role, (role) => role.users)
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

  @OneToMany(() => Auth, (auth) => auth.user, { cascade: true })
  auths: Auth[]

  @OneToMany(() => Plan, (plan) => plan.user, { cascade: true })
  plans: Plan[]

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.user, {
    cascade: true,
  })
  role_permissions: RolePermission[]
}