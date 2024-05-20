import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsBoolean, IsInt, IsOptional, IsString } from 'class-validator'

export class RolePermissionResponse {
  @IsInt()
  @ApiProperty()
  role_permission_id: number

  @IsInt()
  @IsOptional()
  @ApiProperty()
  role_id?: number

  @IsString()
  @IsOptional()
  @ApiProperty()
  user_uuid?: string

  @IsString()
  @ApiProperty()
  permission_id: string

  @IsBoolean()
  @ApiProperty()
  rights: boolean
}

export class ArrayRolePermissionResponse {
  @IsInt()
  @ApiProperty()
  count: number

  @IsArray()
  @ApiProperty({ required: false, type: RolePermissionResponse, isArray: true })
  data: RolePermissionResponse[]
}

export class StatusArrayRolePermissionResponse {
  @IsBoolean()
  @ApiProperty()
  status: boolean

  @IsOptional()
  @ApiProperty({ required: false })
  data?: RolePermissionResponse[]
}

export class StatusRolePermissionResponse {
  @IsBoolean()
  @ApiProperty()
  status: boolean

  @IsOptional()
  @ApiProperty({ required: false })
  data?: RolePermissionResponse
}
