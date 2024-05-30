import { ApiProperty } from '@nestjs/swagger'
import { FilterOffset } from 'src/common/classes/filter_offset'
import { AppStrings } from 'src/common/constants/strings'

export class CurrencySorts {
  @ApiProperty({ default: AppStrings.ASC, required: false })
  currency_code?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  currency_name?: 'ASC' | 'DESC'
}

export class CurrencyFilters {
  @ApiProperty({ required: false })
  currency_code?: string

  @ApiProperty({ required: false })
  currency_name?: string
}

export class CurrencyFilter {
  @ApiProperty({ required: false })
  offset?: FilterOffset

  @ApiProperty({ required: false })
  filter?: CurrencyFilters

  @ApiProperty({ required: false })
  sorts?: CurrencySorts
}
