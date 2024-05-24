import { Field, InputType } from '@nestjs/graphql'
import { FilterOffset } from 'src/common/classes/filter_offset'

@InputType()
export class OrganizationTypeSorts {
  @Field({ nullable: true })
  organization_type_id?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  organization_type_name?: 'ASC' | 'DESC'
}

@InputType()
export class OrganizationTypeFilters {
  @Field({ nullable: true })
  organization_type_id?: number

  @Field({ nullable: true })
  organization_type_name?: string
}

@InputType()
export class OrganizationTypeFilter {
  @Field({ nullable: true })
  offset?: FilterOffset

  @Field({ nullable: true })
  filter?: OrganizationTypeFilters

  @Field({ nullable: true })
  sorts?: OrganizationTypeSorts
}
