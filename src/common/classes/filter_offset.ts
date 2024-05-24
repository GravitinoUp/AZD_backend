import { Field, InputType, Int } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'

@InputType()
export class FilterOffset {
  @ApiProperty({ default: 50 })
  @Field(() => Int, { nullable: true })
  count?: number

  @ApiProperty({ default: 1 })
  @Field(() => Int, { nullable: true })
  page?: number
}
