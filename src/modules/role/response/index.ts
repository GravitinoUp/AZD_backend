import { Field, Int, ObjectType } from '@nestjs/graphql'
import { IsString, IsBoolean, IsInt, IsOptional, IsArray } from 'class-validator'

@ObjectType()
export class RoleResponse {
  @IsInt()
  @Field(() => Int)
  role_id: number

  @IsString()
  @Field()
  role_name: string
}

@ObjectType()
export class ArrayRoleResponse {
  @IsInt()
  @Field(() => Int)
  count: number

  @IsArray()
  @Field(() => [RoleResponse], { nullable: true })
  data?: RoleResponse[]
}

@ObjectType()
export class StatusRoleResponse {
  @IsBoolean()
  @Field()
  status: boolean

  @IsOptional()
  @Field({ nullable: true })
  data?: RoleResponse
}
