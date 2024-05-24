import { Field, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { User } from 'src/modules/user/entities/user.entity'
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'

@ObjectType()
@Entity({ name: 'Auths' })
export class Auth extends BaseModel {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  @Field()
  auth_uuid: string

  @Column()
  @ApiProperty()
  @Field()
  user_uuid: string

  @ManyToOne(() => User, (user) => user.auths)
  @JoinColumn({ name: 'user_uuid', referencedColumnName: 'user_uuid' })
  @ApiProperty()
  user: User

  @Column()
  @ApiProperty()
  @Field()
  user_agent: string

  @Column()
  @ApiProperty()
  @Field()
  ip_address: string
}
