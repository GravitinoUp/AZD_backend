import { ApiProperty } from '@nestjs/swagger'
import { FilterOffset } from 'src/common/classes/filter_offset'
import { AppStrings } from 'src/common/constants/strings'

export class OkeiSorts {
  @ApiProperty({ default: AppStrings.ASC, required: false })
  okei_uuid?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  okei_code?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  okei_full_name?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  okei_short_name?: 'ASC' | 'DESC'
}

export class OkeiFilters {
  @ApiProperty({ required: false })
  okei_uuid?: string

  @ApiProperty({ required: false })
  okei_code?: string

  @ApiProperty({ required: false })
  okei_full_name?: string

  @ApiProperty({ required: false })
  okei_short_name?: string
}

export class OkeiFilter {
  @ApiProperty({ required: false })
  offset?: FilterOffset

  @ApiProperty({ required: false })
  filter?: OkeiFilters

  @ApiProperty({ required: false })
  sorts?: OkeiSorts
}
