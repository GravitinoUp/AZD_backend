import { ApiProperty } from '@nestjs/swagger'
import { FilterOffset } from 'src/common/classes/filter_offset'
import { AppStrings } from 'src/common/constants/strings'
import { PlanPositionFilters, PlanPositionSorts } from 'src/modules/plan-position/filter'
import { UserFilters, UserSorts } from 'src/modules/user/filters'

export class PlanEventSorts {
  @ApiProperty({ default: AppStrings.ASC, required: false })
  plan_event_uuid?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  plan_event_name?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  old_value?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  new_value?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  plan?: PlanPositionSorts

  @ApiProperty({ default: AppStrings.ASC, required: false })
  user?: UserSorts

  @ApiProperty({ default: AppStrings.ASC, required: false })
  created_at?: 'ASC' | 'DESC'
}

export class PlanEventFilters {
  @ApiProperty({ required: false })
  plan_event_uuid?: string

  @ApiProperty({ required: false })
  plan_event_name?: string

  @ApiProperty({ required: false })
  old_value?: string

  @ApiProperty({ required: false })
  new_value?: string

  @ApiProperty({ required: false })
  plan?: PlanPositionFilters

  @ApiProperty({ required: false })
  user?: UserFilters

  @ApiProperty({ required: false })
  created_at?: Date
}

export class PlanEventFilter {
  @ApiProperty({ required: false })
  offset?: FilterOffset

  @ApiProperty({ required: false })
  filter?: PlanEventFilters

  @ApiProperty({ required: false })
  sorts?: PlanEventSorts
}
