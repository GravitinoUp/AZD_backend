import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional, IsInt, IsArray } from 'class-validator'

export class CreateRoleDto {
  @IsString()
  @ApiProperty()
  role_name: string

  @ApiProperty({ default: [] })
  permission_ids: string[]

  @IsArray()
  @IsOptional()
  @ApiProperty({ required: false, default: [] })
  property_values?: string[]
}

export class UpdateRoleDto {
  @IsInt()
  @ApiProperty()
  role_id: number

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  role_name?: string

  @ApiProperty({ default: [] })
  permission_ids?: string[]

  @IsArray()
  @IsOptional()
  @ApiProperty({ required: false, default: [] })
  property_values?: string[]
}
