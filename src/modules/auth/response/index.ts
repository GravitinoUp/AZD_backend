import { Field, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsString } from 'class-validator'

@ObjectType()
export class AuthResponse {
  @IsString()
  @ApiProperty()
  @Field()
  refreshToken: string

  @IsString()
  @ApiProperty()
  @Field()
  accessToken: string
}

@ObjectType()
export class StatusAuthResponse {
  @IsBoolean()
  @ApiProperty()
  @Field()
  status: boolean
}
