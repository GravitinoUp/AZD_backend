import { Field, Int, ObjectType } from '@nestjs/graphql'
import { IsArray, IsBoolean, IsInt, IsOptional, IsString } from 'class-validator'

@ObjectType()
export class RolePermissionResponse {
  @IsInt()
  @Field()
  role_permission_id: number

  @IsInt()
  @IsOptional()
  @Field({ nullable: true })
  role_id?: number

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  user_uuid?: string

  @IsString()
  @Field()
  permission_id: string

  @IsBoolean()
  @Field()
  rights: boolean
}

@ObjectType()
export class ArrayRolePermissionResponse {
  @IsInt()
  @Field(() => Int)
  count: number

  @IsArray()
  @Field(() => [RolePermissionResponse], { nullable: true })
  data?: RolePermissionResponse[]
}

@ObjectType()
export class StatusArrayRolePermissionResponse {
  @IsBoolean()
  @Field()
  status: boolean

  @IsOptional()
  @Field(() => [RolePermissionResponse], { nullable: true })
  data?: RolePermissionResponse[]
}

@ObjectType()
export class StatusRolePermissionResponse {
  @IsBoolean()
  @Field()
  status: boolean

  @IsOptional()
  @Field({ nullable: true })
  data?: RolePermissionResponse
}
