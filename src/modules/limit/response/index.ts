import { ApiProperty } from '@nestjs/swagger'

export class LimitResponse {
  @ApiProperty()
  limit_uuid: string

  @ApiProperty()
  limit_name: string

  @ApiProperty()
  line_code: string

  @ApiProperty()
  kbk_code: string

  @ApiProperty()
  kosgu: string

  @ApiProperty()
  current_year_rub_value: number

  @ApiProperty({ required: false })
  current_year_currency_value?: number

  @ApiProperty({ required: false })
  current_year_currency_code?: string

  @ApiProperty()
  first_year_rub_value: number

  @ApiProperty({ required: false })
  first_year_currency_value?: number

  @ApiProperty({ required: false })
  first_year_currency_code?: string

  @ApiProperty()
  second_year_rub_value: number

  @ApiProperty({ required: false })
  second_year_currency_value?: number

  @ApiProperty({ required: false })
  second_year_currency_code?: string
}

export class ArrayLimitResponse {
  @ApiProperty()
  count: number

  @ApiProperty({ required: false, type: LimitResponse, isArray: true })
  data: LimitResponse[]
}

export class StatusLimitResponse {
  @ApiProperty()
  status: boolean

  @ApiProperty({ required: false })
  data?: LimitResponse
}
