import { Field, InputType, Int } from '@nestjs/graphql'
import { IsString, IsOptional, IsInt } from 'class-validator'

@InputType()
export class CreateRoleDto {
  @IsString()
  @Field()
  role_name: string
}

@InputType()
export class UpdateRoleDto {
  @IsInt()
  @Field(() => Int)
  role_id: number

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  role_name?: string
}
