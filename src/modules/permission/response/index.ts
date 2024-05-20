import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsBoolean, IsInt, IsOptional, IsString } from 'class-validator'

export class PermissionResponse {
  @IsString()
  @ApiProperty()
  permission_id: string

  @IsString()
  @ApiProperty()
  permission_name: string

  @IsString()
  @ApiProperty()
  permission_description: string

  @IsString()
  @ApiProperty()
  entity_name: string
}

export class ArrayPermissionResponse {
  @IsInt()
  @ApiProperty()
  count: number

  @IsArray()
  @ApiProperty({ required: false, type: PermissionResponse, isArray: true })
  data: PermissionResponse[]
}

export class StatusPermissionResponse {
  @IsBoolean()
  @ApiProperty()
  status: boolean

  @IsOptional()
  @ApiProperty({ required: false })
  data?: PermissionResponse
}
