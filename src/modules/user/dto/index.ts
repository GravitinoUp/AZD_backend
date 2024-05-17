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
  @ApiProperty()
  post: string

  @IsUUID()
  @ApiProperty()
  legal_basis_uuid: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  email?: string

  @IsString()
  @ApiProperty()
  phone: string

  @IsString()
  @ApiProperty()
  password: string

  @IsInt()
  @ApiProperty()
  code: number
}

export class CheckUserExistsDto {
  @IsString()
  @ApiProperty()
  phone: string
}

export class UpdateCurrentUserDto {
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
