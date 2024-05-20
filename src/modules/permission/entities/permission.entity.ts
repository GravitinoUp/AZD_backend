import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { RolePermission } from 'src/modules/role-permission/entities/role-permission.entity'
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'

@Entity({ name: 'Permissions' })
export class Permission extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  permission_id: string

  @Column()
  @ApiProperty()
  permission_name: string

  @Column()
  @ApiProperty()
  permission_description: string

  @Column()
  @ApiProperty()
  entity_name: string

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.role_permission_id, {
    cascade: true,
    eager: true,
  })
  role_permissions: RolePermission[]
}
