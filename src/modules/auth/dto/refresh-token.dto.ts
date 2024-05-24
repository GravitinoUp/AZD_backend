import { Field, InputType } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType()
export class RefreshTokenDto {
  @IsString()
  @Field()
  refresh_token: string
}
