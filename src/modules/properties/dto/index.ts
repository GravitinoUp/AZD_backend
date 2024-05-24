import { Field, InputType } from '@nestjs/graphql'
import { IsArray, IsInt, IsOptional, IsString, IsUUID } from 'class-validator'

@InputType()
export class CreatePropertyNameDto {
  @IsString()
  @Field()
  property_name: string

  @IsString()
  @Field()
  entity_name: string
}

@InputType()
export class CreatePropertyValueDto {
  @IsUUID()
  @Field()
  property_name_uuid: string

  @IsString()
  @Field()
  property_value: string
}

@InputType()
export class UpdatePropertyNameDto {
  @IsInt()
  @IsOptional()
  @Field()
  property_name_uuid: string

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  property_name?: string

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  entity_name?: string
}

@InputType()
export class CreatePropertyDto {
  @IsString()
  @Field()
  property_name: string

  @IsArray()
  @Field(() => [String])
  property_values: string[]

  @IsString()
  @Field()
  entity_name: string
}

@InputType()
export class UpdatePropertyDto {
  @IsInt()
  @Field()
  property_name_uuid: string

  @IsString()
  @Field()
  property_name: string

  @IsArray()
  @Field(() => [String])
  property_values: string[]

  @IsString()
  @Field()
  entity_name: string
}
