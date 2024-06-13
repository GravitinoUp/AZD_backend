import { ApiProperty } from '@nestjs/swagger'
import { IsUUID } from 'class-validator'
import { FilterOffset } from 'src/common/classes/filter_offset'
import { AppStrings } from 'src/common/constants/strings'

export class BranchSorts {
  @IsUUID()
  @ApiProperty({ default: AppStrings.ASC, required: false })
  branch_uuid?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  branch_name?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  branch_address?: 'ASC' | 'DESC'
}

export class BranchFilters {
  @IsUUID()
  @ApiProperty({ required: false })
  branch_uuid?: string

  @ApiProperty({ required: false })
  branch_name?: string

  @ApiProperty({ required: false })
  branch_address?: string
}

export class BranchFilter {
  @ApiProperty({ required: false })
  offset?: FilterOffset

  @ApiProperty({ required: false })
  filter?: BranchFilters

  @ApiProperty({ required: false })
  sorts?: BranchSorts
}
