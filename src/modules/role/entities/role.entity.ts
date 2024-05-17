import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity({ name: 'Roles' })
export class Role extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  role_id: number

  @Column()
  @ApiProperty()
  role_name: string

  // @OneToMany(() => User, (user) => user.role, { cascade: true, eager: true })
  // users: User[]
}
