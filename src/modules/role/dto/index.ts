import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional, IsUUID } from 'class-validator'

export class CreateRoleDto {
  @IsString()
  @ApiProperty()
  role_name: string
}

export class UpdateRoleDto {
  @IsUUID()
  @ApiProperty()
  role_uuid: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  role_name?: string
}
