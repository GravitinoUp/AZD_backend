import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional, IsDecimal, IsUUID } from 'class-validator'

export class CreateLimitDto {
  @IsString()
  @ApiProperty()
  limit_name: string

  @IsString()
  @ApiProperty()
  line_code: string

  @IsUUID()
  @ApiProperty()
  kbk_uuid: string

  @IsUUID()
  @ApiProperty()
  kosgu_uuid: string

  @IsDecimal()
  @ApiProperty({ default: '0.0' })
  current_year_rub_value: number

  @IsDecimal()
  @IsOptional()
  @ApiProperty({ required: false })
  current_year_currency_value?: number

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  current_year_currency_code?: string

  @IsDecimal()
  @ApiProperty()
  first_year_rub_value: number

  @IsDecimal()
  @IsOptional()
  @ApiProperty({ required: false })
  first_year_currency_value?: number

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  first_year_currency_code?: string

  @IsDecimal()
  @ApiProperty()
  second_year_rub_value: number

  @IsDecimal()
  @IsOptional()
  @ApiProperty({ required: false })
  second_year_currency_value?: number

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  second_year_currency_code?: string

  @IsUUID()
  @ApiProperty()
  branch_uuid: string
}

export class UpdateLimitDto {
  @IsUUID()
  @ApiProperty()
  limit_uuid: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  limit_name?: string

  @IsUUID()
  @IsOptional()
  @ApiProperty({ required: false })
  kbk_uuid?: string

  @IsUUID()
  @IsOptional()
  @ApiProperty({ required: false })
  kosgu_uuid?: string

  @IsDecimal()
  @IsOptional()
  @ApiProperty({ required: false })
  current_year_rub_value?: number

  @IsDecimal()
  @IsOptional()
  @ApiProperty({ required: false })
  current_year_currency_value?: number

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  current_year_currency_code?: string

  @IsDecimal()
  @IsOptional()
  @ApiProperty({ required: false })
  first_year_rub_value?: number

  @IsDecimal()
  @IsOptional()
  @ApiProperty({ required: false })
  first_year_currency_value?: number

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  first_year_currency_code?: string

  @IsDecimal()
  @IsOptional()
  @ApiProperty({ required: false })
  second_year_rub_value?: number

  @IsDecimal()
  @IsOptional()
  @ApiProperty({ required: false })
  second_year_currency_value?: number

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  second_year_currency_code?: string

  @IsUUID()
  @IsOptional()
  @ApiProperty({ required: false })
  branch_uuid?: string
}
