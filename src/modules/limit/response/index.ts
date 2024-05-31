import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsBoolean, IsInt, IsOptional, IsArray, IsUUID, IsDecimal } from 'class-validator'

export class LimitResponse {
  @IsUUID()
  @ApiProperty()
  limit_uuid: string

  @IsString()
  @ApiProperty()
  limit_name: string

  @IsString()
  @ApiProperty()
  line_code: string

  @IsString()
  @ApiProperty()
  kbk_code: string

  @IsString()
  @ApiProperty()
  kosgu: string

  @IsDecimal()
  @ApiProperty()
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
}

export class ArrayLimitResponse {
  @IsInt()
  @ApiProperty()
  count: number

  @IsArray()
  @ApiProperty({ required: false, type: LimitResponse, isArray: true })
  data: LimitResponse[]
}

export class StatusLimitResponse {
  @IsBoolean()
  @ApiProperty()
  status: boolean

  @IsOptional()
  @ApiProperty({ required: false })
  data?: LimitResponse
}
