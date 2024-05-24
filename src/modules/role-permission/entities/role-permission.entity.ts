import { Field, ObjectType } from '@nestjs/graphql'
import BaseModel from 'src/common/model'
import { Permission } from 'src/modules/permission/entities/permission.entity'
import { Role } from 'src/modules/role/entities/role.entity'
import { User } from 'src/modules/user/entities/user.entity'
import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm'

@ObjectType()
@Entity({ name: 'RolesPermissions' })
export class RolePermission extends BaseModel {
  @PrimaryColumn()
  @Field()
  role_permission_id: number

  @Column()
  @Field()
  role_id: number

  @ManyToOne(() => Role, (role) => role.role_id)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'role_id' })
  @Field(() => Role)
  role: Role

  @Column()
  @Field()
  user_uuid: string

  @ManyToOne(() => User, (user) => user.role_permissions)
  @JoinColumn({ name: 'user_uuid', referencedColumnName: 'user_uuid' })
  @Field(() => User)
  user: User

  @Column()
  @Field()
  permission_id: string

  @ManyToOne(() => Permission, (permission) => permission.role_permissions)
  @JoinColumn({ name: 'permission_id', referencedColumnName: 'permission_id' })
  @Field(() => Permission)
  permission: Permission

  @Column()
  @Field()
  rights: boolean
}
