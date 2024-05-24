import { Field, ObjectType } from '@nestjs/graphql'
import BaseModel from 'src/common/model'
import { Auth } from 'src/modules/auth/entities/auth.entity'
import { Person } from 'src/modules/person/entities/person.entity'
import { Plan } from 'src/modules/plan/entities/plan.entity'
import { RolePermission } from 'src/modules/role-permission/entities/role-permission.entity'
import { Role } from 'src/modules/role/entities/role.entity'
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm'

@ObjectType()
@Entity({ name: 'Users' })
export class User extends BaseModel {
  @PrimaryColumn()
  @Field()
  user_uuid: string

  @Column()
  @Field()
  person_uuid: string

  @ManyToOne(() => Person, (person) => person.users)
  @JoinColumn({ name: 'person_uuid', referencedColumnName: 'person_uuid' })
  @Field()
  person: Person

  @Column()
  @Field()
  role_id: number

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'role_id' })
  @Field()
  role: Role

  @Column({ default: true })
  @Field()
  is_active: boolean

  @Column()
  @Field()
  email: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  phone?: string

  @Column({ select: false })
  @Field()
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
