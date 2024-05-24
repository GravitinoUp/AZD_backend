import { Field, Int, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsBoolean, IsInt, IsOptional, IsArray } from 'class-validator'

@ObjectType()
export class RoleResponse {
  @IsInt()
  @ApiProperty()
  @Field(() => Int)
  role_id: number

  @IsString()
  @ApiProperty()
  @Field()
  role_name: string
}

@ObjectType()
export class ArrayRoleResponse {
  @IsInt()
  @ApiProperty()
  @Field(() => Int)
  count: number

  @IsArray()
  @ApiProperty({ required: false, type: RoleResponse, isArray: true })
  @Field(() => [RoleResponse], { nullable: true })
  data?: RoleResponse[]
}

@ObjectType()
export class StatusRoleResponse {
  @IsBoolean()
  @ApiProperty()
  @Field()
  status: boolean

  @IsOptional()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  data?: RoleResponse
}
