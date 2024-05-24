import { Field, Int, ObjectType } from '@nestjs/graphql'
import { IsArray, IsBoolean, IsInt, IsOptional, IsString, IsUUID } from 'class-validator'

@ObjectType()
export class PropertyValueResponse {
  @IsUUID()
  @Field()
  property_value_uuid: string

  @IsString()
  @Field()
  property_value: string
}

@ObjectType()
export class PropertyResponse {
  @IsUUID()
  @Field()
  property_name_uuid: string

  @IsString()
  @Field()
  property_name: string

  @IsString()
  @Field()
  entity_name: string

  @IsOptional()
  @Field(() => [PropertyValueResponse])
  values?: PropertyValueResponse[]
}

@ObjectType()
export class ArrayPropertyResponse {
  @IsInt()
  @Field(() => Int)
  count: number

  @IsArray()
  @Field(() => [PropertyResponse], { nullable: true })
  data?: PropertyResponse[]
}

@ObjectType()
export class StatusPropertyResponse {
  @IsBoolean()
  @Field()
  status: boolean

  @IsOptional()
  @Field({ nullable: true })
  data?: PropertyResponse
}
