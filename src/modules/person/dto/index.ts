import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString, IsUUID } from 'class-validator'

export class CreatePersonDto {
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
}

export class UpdatePersonDto {
  @IsUUID()
  @ApiProperty()
  person_uuid: string

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
  @ApiProperty({ required: false })
  post?: string

  @IsUUID()
  @IsOptional()
  @ApiProperty({ required: false })
  legal_basis_uuid?: string
}
