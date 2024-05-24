import { Field, InputType, Int } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional, IsInt } from 'class-validator'

@InputType()
export class CreateRoleDto {
  @IsString()
  @ApiProperty()
  @Field()
  role_name: string
}

@InputType()
export class UpdateRoleDto {
  @IsInt()
  @ApiProperty()
  @Field(() => Int)
  role_id: number

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  role_name?: string
}
