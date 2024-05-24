import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class FilterOffset {
  @Field(() => Int, { nullable: true })
  count?: number

  @Field(() => Int, { nullable: true })
  page?: number
}
