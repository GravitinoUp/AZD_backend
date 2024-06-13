import { ApiProperty } from '@nestjs/swagger'
import { IsUUID } from 'class-validator'
import { FilterOffset } from 'src/common/classes/filter_offset'
import { AppStrings } from 'src/common/constants/strings'
import { BranchFilters, BranchSorts } from 'src/modules/branch/filters'
import { PlanStatusSorts, PlanStatusFilters } from 'src/modules/plan-status/filter'

export class PlanSorts {
  @IsUUID()
  @ApiProperty({ default: AppStrings.ASC, required: false })
  plan_uuid?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  plan_number?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  plan_status_id?: 'ASC' | 'DESC'

  @ApiProperty({ required: false })
  plan_status?: PlanStatusSorts

  @ApiProperty({ default: AppStrings.ASC, required: false })
  plan_version?: 'ASC' | 'DESC'

  @ApiProperty({ required: false })
  branch?: BranchSorts

  @ApiProperty({ default: AppStrings.ASC, required: false })
  created_at?: 'ASC' | 'DESC'
}

export class PlanFilters {
  @IsUUID()
  @ApiProperty({ required: false })
  plan_uuid?: string

  @ApiProperty({ required: false })
  plan_number?: number

  @ApiProperty({ required: false })
  plan_status_id?: number

  @ApiProperty({ required: false })
  plan_status?: PlanStatusFilters

  @ApiProperty({ required: false })
  plan_version?: number

  @ApiProperty({ required: false })
  branch?: BranchFilters

  @ApiProperty({ required: false })
  created_at?: Date
}

export class PlanFilter {
  @ApiProperty({ required: false })
  offset?: FilterOffset

  @ApiProperty({ required: false })
  filter?: PlanFilters

  @ApiProperty({ required: false })
  sorts?: PlanSorts
}
