import { Field, InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional, IsInt } from 'class-validator'

@InputType()
export class CreateRoleDto {
  @IsString()
  @ApiProperty()
  @Field()
  role_name: string
}

export class UpdateRoleDto {
  @IsInt()
  @ApiProperty()
  role_id: number

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  role_name?: string
}
