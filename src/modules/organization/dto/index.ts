import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsInt, IsOptional, IsUUID } from 'class-validator'

export class CreateOrganizationDto {
  @IsInt()
  @ApiProperty()
  organization_type_id: number

  @IsUUID()
  @ApiProperty()
  contact_person_uuid: string

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

export class UpdateOrganizationDto {
  @IsUUID()
  @ApiProperty()
  organization_uuid: string

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  organization_type_id?: number

  @IsUUID()
  @IsOptional()
  @ApiProperty({ required: false })
  contact_person_uuid?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  full_name?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  short_name?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  register_number?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  bic?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  address?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  mail_address?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  phone?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  fax?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  email?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  ogrn?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  inn?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  kpp?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  okpo?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  region?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  additional_info?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  web_site?: string
}
