import { ApiProperty } from '@nestjs/swagger'
import { AppStrings } from 'src/common/constants/strings'
import { OrganizationType } from 'src/modules/organization-type/entities/organization-type.entity'
import { Person } from 'src/modules/person/entities/person.entity'

export class OrganizationResponse {
  @ApiProperty()
  organization_uuid: string

  @ApiProperty()
  organization_type_id: number

  @ApiProperty({ required: false })
  organization_type: OrganizationType

  @ApiProperty()
  contact_person_uuid: string

  @ApiProperty({ required: false })
  contact_person: Person

  @ApiProperty()
  full_name: string

  @ApiProperty()
  short_name: string

  @ApiProperty()
  register_number: string

  @ApiProperty()
  bic: string

  @ApiProperty()
  address: string

  @ApiProperty()
  mail_address: string

  @ApiProperty()
  phone: string

  @ApiProperty({ required: false })
  fax?: string

  @ApiProperty({ required: false })
  email?: string

  @ApiProperty()
  ogrn: string

  @ApiProperty()
  inn: string

  @ApiProperty()
  kpp: string

  @ApiProperty()
  okpo: string

  @ApiProperty()
  region: string

  @ApiProperty({ required: false })
  additional_info?: string

  @ApiProperty({ required: false })
  web_site?: string

  @ApiProperty({ description: AppStrings.PROPERTY_VALUES })
  property_values: string[]
}

export class ArrayOrganizationResponse {
  @ApiProperty()
  count: number

  @ApiProperty({ required: false, type: OrganizationResponse, isArray: true })
  data: OrganizationResponse[]
}

export class StatusOrganizationResponse {
  @ApiProperty()
  status: boolean

  @ApiProperty({ required: false })
  data?: OrganizationResponse
}
