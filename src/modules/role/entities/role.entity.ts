import { ApiProperty } from '@nestjs/swagger'
import { AppStrings } from 'src/common/constants/strings'
import BaseModel from 'src/common/model'
import { RoleAgreement } from 'src/modules/role-agreement/entities/role-agreement.entity'
import { RolePermission } from 'src/modules/role-permission/entities/role-permission.entity'
import { User } from 'src/modules/user/entities/user.entity'
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'

@Entity({ name: 'Roles' })
export class Role extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  role_id: number

  @Column()
  @ApiProperty()
  role_name: string

  @Column({ type: 'uuid', array: true })
  @ApiProperty({ description: AppStrings.PROPERTY_VALUES })
  property_values: string[]

  @OneToMany(() => User, (user) => user.role, { cascade: true })
  users: User[]

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.role, {
    cascade: true,
  })
  role_permissions: RolePermission[]

  @OneToMany(() => RoleAgreement, (roleAgreement) => roleAgreement.parent_role, { cascade: true })
  parent_role_agreements: RoleAgreement[]

  @OneToMany(() => RoleAgreement, (roleAgreement) => roleAgreement.role, { cascade: true })
  role_agreements: RoleAgreement[]
}
