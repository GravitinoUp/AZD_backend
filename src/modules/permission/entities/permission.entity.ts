import { Field, ObjectType } from '@nestjs/graphql'
import BaseModel from 'src/common/model'
import { RolePermission } from 'src/modules/role-permission/entities/role-permission.entity'
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'

@ObjectType()
@Entity({ name: 'Permissions' })
export class Permission extends BaseModel {
  @PrimaryColumn()
  @Field()
  permission_id: string

  @Column()
  @Field()
  permission_name: string

  @Column()
  @Field()
  permission_description: string

  @Column()
  @Field()
  entity_name: string

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.permission, {
    cascade: true,
    eager: true,
  })
  role_permissions: RolePermission[]
}
