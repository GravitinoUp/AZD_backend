import { Field, ObjectType } from '@nestjs/graphql'
import BaseModel from 'src/common/model'
import { User } from 'src/modules/user/entities/user.entity'
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'

@ObjectType()
@Entity({ name: 'Auths' })
export class Auth extends BaseModel {
  @PrimaryGeneratedColumn()
  @Field()
  auth_uuid: string

  @Column()
  @Field()
  user_uuid: string

  @ManyToOne(() => User, (user) => user.auths)
  @JoinColumn({ name: 'user_uuid', referencedColumnName: 'user_uuid' })
  user: User

  @Column()
  @Field()
  user_agent: string

  @Column()
  @Field()
  ip_address: string
}
