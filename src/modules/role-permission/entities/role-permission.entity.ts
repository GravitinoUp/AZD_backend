import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Permission } from 'src/modules/permission/entities/permission.entity'
import { Role } from 'src/modules/role/entities/role.entity'
import { User } from 'src/modules/user/entities/user.entity'
import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm'

@Entity({ name: 'RolesPermissions' })
export class RolePermission extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  role_permission_uuid: string

  @Column()
  @ApiProperty()
  role_id: number

  @ManyToOne(() => Role, (role) => role.role_permissions)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'role_id' })
  @ApiProperty()
  role: Role

  @Column()
  @ApiProperty()
  user_uuid: string

  @ManyToOne(() => User, (user) => user.role_permissions)
  @JoinColumn({ name: 'user_uuid', referencedColumnName: 'user_uuid' })
  @ApiProperty()
  user: User

  @Column()
  @ApiProperty()
  permission_id: string

  @ManyToOne(() => Permission, (permission) => permission.role_permissions)
  @JoinColumn({ name: 'permission_id', referencedColumnName: 'permission_id' })
  @ApiProperty()
  permission: Permission

  @Column()
  @ApiProperty()
  rights: boolean
}
