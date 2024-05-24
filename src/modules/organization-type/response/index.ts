import { Field, ObjectType } from '@nestjs/graphql'
import { IsString, IsBoolean, IsInt, IsOptional, IsArray } from 'class-validator'

@ObjectType()
export class OrganizationTypeResponse {
  @IsInt()
  @Field()
  organization_type_id: number

  @IsString()
  @Field()
  organization_type_name: string
}

@ObjectType()
export class ArrayOrganizationTypeResponse {
  @IsInt()
  @Field()
  count: number

  @IsArray()
  @Field(() => [OrganizationTypeResponse], { nullable: true })
  data: OrganizationTypeResponse[]
}

@ObjectType()
export class StatusOrganizationTypeResponse {
  @IsBoolean()
  @Field()
  status: boolean

  @IsOptional()
  @Field({ nullable: true })
  data?: OrganizationTypeResponse
}
