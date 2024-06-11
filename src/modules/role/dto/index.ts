import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional, IsInt } from 'class-validator'

export class CreateRoleDto {
  @IsString()
  @ApiProperty()
  role_name: string

  @ApiProperty({ default: [] })
  permission_ids: string[]
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
}
