import { Field, ObjectType } from '@nestjs/graphql'
import { IsBoolean, IsString } from 'class-validator'

@ObjectType()
export class AuthResponse {
  @IsString()
  @Field()
  refreshToken: string

  @IsString()
  @Field()
  accessToken: string
}

@ObjectType()
export class StatusAuthResponse {
  @IsBoolean()
  @Field()
  status: boolean
}
