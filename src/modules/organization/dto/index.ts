import { Field, InputType, Int } from '@nestjs/graphql'
import { IsString, IsInt, IsOptional, IsUUID } from 'class-validator'

@InputType()
export class CreateOrganizationDto {
  @IsInt()
  @Field(() => Int)
  organization_type_id: number

  @IsUUID()
  @Field()
  contact_person_uuid: string

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

@InputType()
export class UpdateOrganizationDto {
  @IsUUID()
  @Field()
  organization_uuid: string

  @IsInt()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  organization_type_id?: number

  @IsUUID()
  @IsOptional()
  @Field({ nullable: true })
  contact_person_uuid?: string

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  full_name?: string

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  short_name?: string

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  register_number?: string

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  bic?: string

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  address?: string

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  mail_address?: string

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  phone?: string

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  fax?: string

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  email?: string

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  ogrn?: string

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  inn?: string

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  kpp?: string

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  okpo?: string

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  region?: string

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  additional_info?: string

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  web_site?: string
}
