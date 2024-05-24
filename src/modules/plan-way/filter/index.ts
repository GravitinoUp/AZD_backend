import { Field, InputType, Int } from '@nestjs/graphql'
import { FilterOffset } from 'src/common/classes/filter_offset'

@InputType()
export class PlanWaySorts {
  @Field({ nullable: true })
  way_id?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  way_name?: 'ASC' | 'DESC'
}

@InputType()
export class PlanWayFilters {
  @Field(() => Int, { nullable: true })
  way_id?: number

  @Field({ nullable: true })
  way_name?: string
}

@InputType()
export class PlanWayFilter {
  @Field({ nullable: true })
  offset?: FilterOffset

  @Field({ nullable: true })
  filter?: PlanWayFilters

  @Field({ nullable: true })
  sorts?: PlanWaySorts
}
