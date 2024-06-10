import { ApiProperty } from '@nestjs/swagger'
import { FilterOffset } from 'src/common/classes/filter_offset'
import { AppStrings } from 'src/common/constants/strings'

export class PlanStatusSorts {
  @ApiProperty({ default: AppStrings.ASC, required: false })
  plan_status_id?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  plan_status_name?: 'ASC' | 'DESC'
}

export class PlanStatusFilters {
  @ApiProperty({ required: false })
  plan_status_id?: number

  @ApiProperty({ required: false })
  plan_status_name?: string
}

export class PlanStatusFilter {
  @ApiProperty({ required: false })
  offset?: FilterOffset

  @ApiProperty({ required: false })
  filter?: PlanStatusFilters

  @ApiProperty({ required: false })
  sorts?: PlanStatusSorts
}
