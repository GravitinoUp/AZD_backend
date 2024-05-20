import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsBoolean, IsInt, IsOptional, IsArray, IsUUID } from 'class-validator'
import { OrganizationType } from 'src/modules/organization-type/entities/organization-type.entity'
import { Person } from 'src/modules/person/entities/person.entity'

export class OrganizationResponse {
  @IsUUID()
  @ApiProperty()
  organization_uuid: string

  @IsInt()
  @ApiProperty()
  organization_type_id: number

  @ApiProperty({ required: false })
  organization_type: OrganizationType

  @IsUUID()
  @ApiProperty()
  contact_person_uuid: string

  @ApiProperty({ required: false })
  contact_person: Person

  @IsString()
  @ApiProperty()
  full_name: string

  @IsString()
  @ApiProperty()
  short_name: string

  @IsString()
  @ApiProperty()
  register_number: string

  @IsString()
  @ApiProperty()
  bic: string

  @IsString()
  @ApiProperty()
  address: string

  @IsString()
  @ApiProperty()
  mail_address: string

  @IsString()
  @ApiProperty()
  phone: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  fax?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  email?: string

  @IsString()
  @ApiProperty()
  ogrn: string

  @IsString()
  @ApiProperty()
  inn: string

  @IsString()
  @ApiProperty()
  kpp: string

  @IsString()
  @ApiProperty()
  okpo: string

  @IsString()
  @ApiProperty()
  region: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  additional_info?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  web_site?: string
}

export class ArrayOrganizationResponse {
  @IsInt()
  @ApiProperty()
  count: number

  @IsArray()
  @ApiProperty({ required: false, type: OrganizationResponse, isArray: true })
  data: OrganizationResponse[]
}

export class StatusOrganizationResponse {
  @IsBoolean()
  @ApiProperty()
  status: boolean

  @IsOptional()
  @ApiProperty({ required: false })
  data?: OrganizationResponse
}
