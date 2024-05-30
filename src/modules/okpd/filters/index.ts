import { ApiProperty } from '@nestjs/swagger'
import { FilterOffset } from 'src/common/classes/filter_offset'
import { AppStrings } from 'src/common/constants/strings'

export class OkpdSorts {
  @ApiProperty({ default: AppStrings.ASC, required: false })
  okpd_code?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  okpd_name?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  okpd_data_json?: 'ASC' | 'DESC'
}

export class OkpdFilters {
  @ApiProperty({ required: false })
  okpd_code?: string

  @ApiProperty({ required: false })
  okpd_name?: string

  @ApiProperty({ required: false })
  okpd_data_json?: string
}

export class OkpdFilter {
  @ApiProperty({ required: false })
  offset?: FilterOffset

  @ApiProperty({ required: false })
  filter?: OkpdFilters

  @ApiProperty({ required: false })
  sorts?: OkpdSorts
}
