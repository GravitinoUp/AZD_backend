import { Field, InputType } from '@nestjs/graphql'
import { IsOptional, IsString, IsUUID } from 'class-validator'

@InputType()
export class CreatePersonDto {
  @IsString()
  @Field()
  last_name: string

  @IsString()
  @Field()
  first_name: string

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  patronymic?: string

  @IsString()
  @Field()
  post: string

  @IsUUID()
  @Field()
  legal_basis_uuid: string
}

@InputType()
export class UpdatePersonDto {
  @IsUUID()
  @Field()
  person_uuid: string

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  last_name?: string

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  first_name?: string

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  patronymic?: string

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  post?: string

  @IsUUID()
  @IsOptional()
  @Field({ nullable: true })
  legal_basis_uuid?: string
}
