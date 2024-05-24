import { Field, InputType } from '@nestjs/graphql'
import { IsNumber, IsString } from 'class-validator'

@InputType()
export class AuthDto {
  @IsString()
  @Field()
  email: string

  @IsString()
  @Field()
  password: string
}

@InputType()
export class CreateAuthDto {
  @IsNumber()
  @Field()
  user_uuid: string

  @IsString()
  @Field()
  user_agent: string

  @IsString()
  @Field()
  ip_address: string
}
