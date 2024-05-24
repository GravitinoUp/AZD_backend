import { Field, ObjectType } from '@nestjs/graphql'
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator'

@ObjectType()
export class UserResponse {
  @IsUUID()
  @Field()
  user_uuid: string

  @IsString()
  @Field()
  person_uuid: string

  @IsString()
  @Field()
  role_id: number

  @IsBoolean()
  @Field()
  is_active: boolean

  @IsString()
  @Field()
  email: string

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  phone?: string

  @IsString()
  @Field()
  password: string
}

@ObjectType()
export class StatusUserResponse {
  @IsBoolean()
  @Field()
  status: boolean

  @IsOptional()
  @Field({ nullable: true })
  data?: UserResponse
}
