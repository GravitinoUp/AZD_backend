import { ApiProperty } from '@nestjs/swagger'
import { FilterOffset } from 'src/common/classes/filter_offset'
import { AppStrings } from 'src/common/constants/strings'
import { OrganizationType } from 'src/modules/organization-type/entities/organization-type.entity'
import { OrganizationTypeSorts } from 'src/modules/organization-type/filters'
import { PersonSorts } from 'src/modules/person/filters'

export class OrganizationSorts {
  @ApiProperty({ default: AppStrings.ASC, required: false })
  organization_uuid?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  organization_type_id?: 'ASC' | 'DESC'

  @ApiProperty({ required: false })
  organization_type?: OrganizationTypeSorts

  @ApiProperty({ default: AppStrings.ASC, required: false })
  contact_person_uuid?: 'ASC' | 'DESC'

  @ApiProperty({ required: false })
  contact_person?: PersonSorts

  @ApiProperty({ default: AppStrings.ASC, required: false })
  full_name?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  short_name?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  register_number?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  bic?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  address?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  mail_address?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  phone?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  fax?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  email?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  ogrn?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  inn?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  kpp?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  okpo?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  region?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  additional_info?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  web_site?: 'ASC' | 'DESC'
}

export class OrganizationFilters {
  @ApiProperty({ required: false })
  organization_uuid?: string

  @ApiProperty({ required: false })
  organization_type_id?: number

  @ApiProperty({ required: false })
  contact_person_uuid?: string

  @ApiProperty({ required: false })
  full_name?: string

  @ApiProperty({ required: false })
  short_name?: string

  @ApiProperty({ required: false })
  register_number?: string

  @ApiProperty({ required: false })
  bic?: string

  @ApiProperty({ required: false })
  address?: string

  @ApiProperty({ required: false })
  mail_address?: string

  @ApiProperty({ required: false })
  phone?: string

  @ApiProperty({ required: false })
  fax?: string

  @ApiProperty({ required: false })
  email?: string

  @ApiProperty({ required: false })
  ogrn?: string

  @ApiProperty({ required: false })
  inn?: string

  @ApiProperty({ required: false })
  kpp?: string

  @ApiProperty({ required: false })
  okpo?: string

  @ApiProperty({ required: false })
  region?: string

  @ApiProperty({ required: false })
  additional_info?: string

  @ApiProperty({ required: false })
  web_site?: string
}

export class OrganizationFilter {
  @ApiProperty({ required: false })
  offset?: FilterOffset

  @ApiProperty({ required: false })
  filter?: OrganizationFilters

  @ApiProperty({ required: false })
  sorts?: OrganizationSorts
}
