import { Field, Int, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { User } from 'src/modules/user/entities/user.entity'
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'

@ObjectType()
@Entity({ name: 'Roles' })
export class Role extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  @Field(() => Int)
  role_id: number

  @Column()
  @ApiProperty()
  @Field()
  role_name: string

  @OneToMany(() => User, (user) => user.role, { cascade: true })
  users: User[]
}
