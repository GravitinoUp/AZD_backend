import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator'

export class UserResponse {
  @IsUUID()
  @ApiProperty()
  user_uuid: string

  @IsString()
  @ApiProperty()
  person_uuid: string

  @IsString()
  @ApiProperty()
  role_id: number

  @IsBoolean()
  @ApiProperty()
  is_active: boolean

  @IsString()
  @ApiProperty()
  email: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  phone?: string

  @IsString()
  @ApiProperty()
  password: string
}

export class StatusUserResponse {
  @IsBoolean()
  @ApiProperty()
  status: boolean

  @IsOptional()
  @ApiProperty({ required: false })
  data?: UserResponse
}
