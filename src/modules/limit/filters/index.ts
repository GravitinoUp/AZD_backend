import { ApiProperty } from '@nestjs/swagger'
import { FilterOffset } from 'src/common/classes/filter_offset'
import { AppStrings } from 'src/common/constants/strings'
import { BranchFilters, BranchSorts } from 'src/modules/branch/filters'
import { KBKFilters, KBKSorts } from 'src/modules/kbk/filters'
import { KosguFilters, KosguSorts } from 'src/modules/kosgu/filters'
import { LimitStatusFilters, LimitStatusSorts } from 'src/modules/limit-status/filters'

export class LimitSorts {
  @ApiProperty({ default: AppStrings.ASC, required: false })
  limit_uuid?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  limit_name?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  kbk_uuid?: 'ASC' | 'DESC'

  @ApiProperty({ required: false })
  kbk?: KBKSorts

  @ApiProperty({ default: AppStrings.ASC, required: false })
  kosgu_uuid?: 'ASC' | 'DESC'

  @ApiProperty({ required: false })
  kosgu?: KosguSorts

  @ApiProperty({ default: AppStrings.ASC, required: false })
  limit_version?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  limit_status_id?: 'ASC' | 'DESC'

  @ApiProperty({ required: false })
  limit_status?: LimitStatusSorts

  @ApiProperty({ default: AppStrings.ASC, required: false })
  branch_uuid?: 'ASC' | 'DESC'

  @ApiProperty({ required: false })
  branch?: BranchSorts
}

export class LimitFilters {
  @ApiProperty({ required: false })
  limit_uuid?: string

  @ApiProperty({ required: false })
  limit_name?: string

  @ApiProperty({ required: false })
  kbk_uuid?: string

  @ApiProperty({ required: false })
  kbk?: KBKFilters

  @ApiProperty({ required: false })
  kosgu_uuid?: string

  @ApiProperty({ required: false })
  kosgu?: KosguFilters

  @ApiProperty({ required: false })
  limit_version?: number

  @ApiProperty({ required: false })
  limit_status_id?: number

  @ApiProperty({ required: false })
  limit_status?: LimitStatusFilters

  //TODO years

  @ApiProperty({ required: false })
  branch_uuid?: string

  @ApiProperty({ required: false })
  branch?: BranchFilters
}

export class LimitFilter {
  @ApiProperty({ required: false })
  offset?: FilterOffset

  @ApiProperty({ required: false })
  filter?: LimitFilters

  @ApiProperty({ required: false })
  sorts?: LimitSorts
}
