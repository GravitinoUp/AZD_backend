import { ApiProperty } from '@nestjs/swagger'
import { FilterOffset } from 'src/common/classes/filter_offset'
import { AppStrings } from 'src/common/constants/strings'

export class LimitStatusSorts {
  @ApiProperty({ default: AppStrings.ASC, required: false })
  limit_status_id?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  limit_status_name?: 'ASC' | 'DESC'
}

export class LimitStatusFilters {
  @ApiProperty({ required: false })
  limit_status_id?: number

  @ApiProperty({ required: false })
  limit_status_name?: string
}

export class LimitStatusFilter {
  @ApiProperty({ required: false })
  offset?: FilterOffset

  @ApiProperty({ required: false })
  filter?: LimitStatusFilters

  @ApiProperty({ required: false })
  sorts?: LimitStatusSorts
}
