import { Field, InputType, Int } from '@nestjs/graphql'
import { FilterOffset } from 'src/common/classes/filter_offset'

@InputType()
export class RoleSorts {
  @Field({ nullable: true })
  role_id?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  role_name?: 'ASC' | 'DESC'
}

@InputType()
export class RoleFilters {
  @Field(() => Int, { nullable: true })
  role_id?: number

  @Field({ nullable: true })
  role_name?: string
}

@InputType()
export class RoleFilter {
  @Field({ nullable: true })
  offset?: FilterOffset

  @Field({ nullable: true })
  filter?: RoleFilters

  @Field({ nullable: true })
  sorts?: RoleSorts
}
