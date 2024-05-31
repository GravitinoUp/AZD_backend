import { ApiProperty } from '@nestjs/swagger'
import { FilterOffset } from 'src/common/classes/filter_offset'
import { AppStrings } from 'src/common/constants/strings'
import { LimitFilters, LimitSorts } from 'src/modules/limit/filters'
import { UserFilters, UserSorts } from 'src/modules/user/filters'

export class LimitEventSorts {
  @ApiProperty({ default: AppStrings.ASC, required: false })
  limit_event_uuid?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  limit_event_name?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  old_value?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  new_value?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  limit?: LimitSorts

  @ApiProperty({ default: AppStrings.ASC, required: false })
  user?: UserSorts

  @ApiProperty({ default: AppStrings.ASC, required: false })
  created_at?: 'ASC' | 'DESC'
}

export class LimitEventFilters {
  @ApiProperty({ required: false })
  limit_event_uuid?: string

  @ApiProperty({ required: false })
  limit_event_name?: string

  @ApiProperty({ required: false })
  old_value?: string

  @ApiProperty({ required: false })
  new_value?: string

  @ApiProperty({ required: false })
  limit?: LimitFilters

  @ApiProperty({ required: false })
  user?: UserFilters

  @ApiProperty({ required: false })
  created_at?: Date
}

export class LimitEventFilter {
  @ApiProperty({ required: false })
  offset?: FilterOffset

  @ApiProperty({ required: false })
  filter?: LimitEventFilters

  @ApiProperty({ required: false })
  sorts?: LimitEventSorts
}
