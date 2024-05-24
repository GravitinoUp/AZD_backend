import { Field, InputType } from '@nestjs/graphql'
import { FilterOffset } from 'src/common/classes/filter_offset'

@InputType()
export class PropertySorts {
  @Field({ nullable: true })
  property_name_uuid?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  property_name?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  entity_name?: 'ASC' | 'DESC'
}

@InputType()
export class PropertyFilters {
  @Field({ nullable: true })
  property_name_uuid?: string

  @Field({ nullable: true })
  property_name?: string

  @Field({ nullable: true })
  entity_name?: string
}

@InputType()
export class PropertyFilter {
  @Field({ nullable: true })
  offset?: FilterOffset

  @Field({ nullable: true })
  filter?: PropertyFilters

  @Field({ nullable: true })
  sorts?: PropertySorts
}
