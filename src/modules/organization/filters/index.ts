import { Field, InputType, Int } from '@nestjs/graphql'
import { FilterOffset } from 'src/common/classes/filter_offset'

@InputType()
export class OrganizationSorts {
  @Field({ nullable: true })
  organization_uuid?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  organization_type_id?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  contact_person_uuid?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  full_name?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  short_name?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  register_number?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  bic?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  address?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  mail_address?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  phone?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  fax?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  email?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  ogrn?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  inn?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  kpp?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  okpo?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  region?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  additional_info?: 'ASC' | 'DESC'

  @Field({ nullable: true })
  web_site?: 'ASC' | 'DESC'
}

@InputType()
export class OrganizationFilters {
  @Field({ nullable: true })
  organization_uuid?: string

  @Field(() => Int, { nullable: true })
  organization_type_id?: number

  @Field({ nullable: true })
  contact_person_uuid?: string

  @Field({ nullable: true })
  full_name?: string

  @Field({ nullable: true })
  short_name?: string

  @Field({ nullable: true })
  register_number?: string

  @Field({ nullable: true })
  bic?: string

  @Field({ nullable: true })
  address?: string

  @Field({ nullable: true })
  mail_address?: string

  @Field({ nullable: true })
  phone?: string

  @Field({ nullable: true })
  fax?: string

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  ogrn?: string

  @Field({ nullable: true })
  inn?: string

  @Field({ nullable: true })
  kpp?: string

  @Field({ nullable: true })
  okpo?: string

  @Field({ nullable: true })
  region?: string

  @Field({ nullable: true })
  additional_info?: string

  @Field({ nullable: true })
  web_site?: string
}

@InputType()
export class OrganizationFilter {
  @Field({ nullable: true })
  offset?: FilterOffset

  @Field({ nullable: true })
  filter?: OrganizationFilters

  @Field({ nullable: true })
  sorts?: OrganizationSorts
}
