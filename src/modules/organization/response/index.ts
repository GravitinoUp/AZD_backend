import { Field, Int, ObjectType } from '@nestjs/graphql'
import { IsString, IsBoolean, IsInt, IsOptional, IsArray, IsUUID } from 'class-validator'
import { OrganizationType } from 'src/modules/organization-type/entities/organization-type.entity'
import { Person } from 'src/modules/person/entities/person.entity'

@ObjectType()
export class OrganizationResponse {
  @IsUUID()
  @Field()
  organization_uuid: string

  @IsInt()
  @Field(() => Int)
  organization_type_id: number

  @Field({ nullable: true })
  organization_type?: OrganizationType

  @IsUUID()
  @Field()
  contact_person_uuid: string

  @Field({ nullable: true })
  contact_person: Person

  @IsString()
  @Field()
  full_name: string

  @IsString()
  @Field()
  short_name: string

  @IsString()
  @Field()
  register_number: string

  @IsString()
  @Field()
  bic: string

  @IsString()
  @Field()
  address: string

  @IsString()
  @Field()
  mail_address: string

  @IsString()
  @Field()
  phone: string

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  fax?: string

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  email?: string

  @IsString()
  @Field()
  ogrn: string

  @IsString()
  @Field()
  inn: string

  @IsString()
  @Field()
  kpp: string

  @IsString()
  @Field()
  okpo: string

  @IsString()
  @Field()
  region: string

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  additional_info?: string

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  web_site?: string
}

@ObjectType()
export class ArrayOrganizationResponse {
  @IsInt()
  @Field(() => Int)
  count: number

  @IsArray()
  @Field(() => [OrganizationResponse], { nullable: true })
  data: OrganizationResponse[]
}

@ObjectType()
export class StatusOrganizationResponse {
  @IsBoolean()
  @Field()
  status: boolean

  @IsOptional()
  @Field({ nullable: true })
  data?: OrganizationResponse
}
