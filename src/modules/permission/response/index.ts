import { Field, ObjectType } from '@nestjs/graphql'
import { IsArray, IsBoolean, IsInt, IsOptional, IsString } from 'class-validator'

@ObjectType()
export class PermissionResponse {
  @IsString()
  @Field()
  permission_id: string

  @IsString()
  @Field()
  permission_name: string

  @IsString()
  @Field()
  permission_description: string

  @IsString()
  @Field()
  entity_name: string
}

@ObjectType()
export class ArrayPermissionResponse {
  @IsInt()
  @Field()
  count: number

  @IsArray()
  @Field(() => [PermissionResponse], { nullable: true })
  data: PermissionResponse[]
}

@ObjectType()
export class StatusPermissionResponse {
  @IsBoolean()
  @Field()
  status: boolean

  @IsOptional()
  @Field({ nullable: true })
  data?: PermissionResponse
}
