import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { User } from 'src/modules/user/entities/user.entity'
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'

@Entity({ name: 'Auths' })
export class Auth extends BaseModel {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  auth_uuid: string

  @Column()
  @ApiProperty()
  user_uuid: string

  @ManyToOne(() => User, (user) => user.auths)
  @JoinColumn({ name: 'user_uuid', referencedColumnName: 'user_uuid' })
  @ApiProperty()
  user: User

  @Column()
  @ApiProperty()
  user_agent: string

  @Column()
  @ApiProperty()
  ip_address: string
}
