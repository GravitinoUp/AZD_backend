import { ApiProperty } from '@nestjs/swagger'
import { FilterOffset } from 'src/common/classes/filter_offset'
import { AppStrings } from 'src/common/constants/strings'

export class PlanWaySorts {
  @ApiProperty({ default: AppStrings.ASC, required: false })
  way_id?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  way_name?: 'ASC' | 'DESC'
}

export class PlanWayFilters {
  @ApiProperty({ required: false })
  way_id?: number

  @ApiProperty({ required: false })
  way_name?: string
}

export class PlanWayFilter {
  @ApiProperty({ required: false })
  offset?: FilterOffset

  @ApiProperty({ required: false })
  filter?: PlanWayFilters

  @ApiProperty({ required: false })
  sorts?: PlanWaySorts
}
