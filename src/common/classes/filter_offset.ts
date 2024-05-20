import { Field, InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'

@InputType()
export class FilterOffset {
  @ApiProperty({ default: 50 })
  @Field({ nullable: true })
  count?: number

  @ApiProperty({ default: 1 })
  @Field({ nullable: true })
  page?: number
}
