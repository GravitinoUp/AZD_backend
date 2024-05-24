import { Field, InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

@InputType()
export class RefreshTokenDto {
  @IsString()
  @ApiProperty()
  @Field()
  refresh_token: string
}
