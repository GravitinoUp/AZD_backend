import { Field, InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

@InputType()
export class AuthDto {
  @IsString()
  @ApiProperty({ default: 'user1@mail.com' })
  @Field()
  email: string

  @IsString()
  @ApiProperty()
  @Field()
  password: string
}

@InputType()
export class CreateAuthDto {
  @IsNumber()
  @ApiProperty()
  @Field()
  user_uuid: string

  @IsString()
  @ApiProperty()
  @Field()
  user_agent: string

  @IsString()
  @ApiProperty()
  @Field()
  ip_address: string
}
