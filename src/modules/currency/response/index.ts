import { ApiProperty } from '@nestjs/swagger'

export class CurrencyResponse {
  @ApiProperty()
  currency_code: string

  @ApiProperty()
  currency_name: string
}

export class ArrayCurrencyResponse {
  @ApiProperty()
  count: number

  @ApiProperty({ required: false, type: CurrencyResponse, isArray: true })
  data: CurrencyResponse[]
}

export class StatusCurrencyResponse {
  @ApiProperty()
  status: boolean

  @ApiProperty({ required: false })
  data?: CurrencyResponse
}
