import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsBoolean, IsInt, IsOptional, IsArray } from 'class-validator'

export class CurrencyResponse {
  @IsString()
  @ApiProperty()
  currency_code: string

  @IsString()
  @ApiProperty()
  currency_name: string
}

export class ArrayCurrencyResponse {
  @IsInt()
  @ApiProperty()
  count: number

  @IsArray()
  @ApiProperty({ required: false, type: CurrencyResponse, isArray: true })
  data: CurrencyResponse[]
}

export class StatusCurrencyResponse {
  @IsBoolean()
  @ApiProperty()
  status: boolean

  @IsOptional()
  @ApiProperty({ required: false })
  data?: CurrencyResponse
}
