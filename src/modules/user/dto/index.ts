import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional, IsInt, IsUUID } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  last_name: string

  @IsString()
  @ApiProperty()
  first_name: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  patronymic?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  post?: string

  @IsUUID()
  @IsOptional()
  @ApiProperty({ required: false })
  legal_basis_uuid?: string

  @IsInt()
  @ApiProperty()
  role_id: number

  @IsString()
  @ApiProperty()
  email: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  phone?: string

  @IsString()
  @ApiProperty()
  password: string
}

export class CheckUserExistsDto {
  @IsString()
  @ApiProperty()
  phone: string
}

export class UpdateUserDto {
  @IsUUID()
  @ApiProperty()
  user_uuid: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  last_name?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  first_name?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  patronymic?: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  post?: string

  @IsUUID()
  @IsOptional()
  @ApiProperty()
  legal_basis_uuid?: string
}

export class UpdateUserPasswordDto {
  @IsString()
  @ApiProperty()
  old_password: string

  @IsString()
  @ApiProperty()
  password: string
}

export class ResetUserPasswordDto {
  @IsInt()
  @ApiProperty()
  code: number

  @IsString()
  @ApiProperty()
  password: string
}
