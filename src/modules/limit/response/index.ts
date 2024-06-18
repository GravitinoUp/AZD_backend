import { ApiProperty } from '@nestjs/swagger'
import { BranchResponse } from 'src/modules/branch/response'
import { CurrencyResponse } from 'src/modules/currency/response'
import { KBKResponse } from 'src/modules/kbk/response'
import { KosguResponse } from 'src/modules/kosgu/response'
import { LimitStatusResponse } from 'src/modules/limit-status/response'

export class LimitValueResponse {
  @ApiProperty()
  limit_value_uuid: string

  @ApiProperty()
  limit_uuid: string

  @ApiProperty()
  limit_value_year: number

  @ApiProperty()
  rub_value: number

  @ApiProperty({ required: false })
  currency_value?: number

  @ApiProperty({ required: false })
  currency_code?: string

  @ApiProperty({ required: false })
  currency?: CurrencyResponse
}

export class LimitResponse {
  @ApiProperty()
  limit_uuid: string

  @ApiProperty()
  limit_name: string

  @ApiProperty()
  line_code: string

  @ApiProperty()
  kbk_uuid: string

  @ApiProperty({ required: false })
  kbk?: KBKResponse

  @ApiProperty()
  kosgu_uuid: string

  @ApiProperty({ required: false })
  kosgu?: KosguResponse

  @ApiProperty({ required: false })
  limit_version?: number

  @ApiProperty()
  limit_status_id: number

  @ApiProperty({ required: false })
  limit_status?: LimitStatusResponse

  @ApiProperty()
  years: LimitValueResponse[]

  @ApiProperty()
  branch_uuid: string

  @ApiProperty({ required: false })
  branch?: BranchResponse
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
