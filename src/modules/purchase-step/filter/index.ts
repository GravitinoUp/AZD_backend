import { ApiProperty } from '@nestjs/swagger'
import { FilterOffset } from 'src/common/classes/filter_offset'
import { AppStrings } from 'src/common/constants/strings'

export class PurchaseStepSorts {
  @ApiProperty({ default: AppStrings.ASC, required: false })
  purchase_step_id?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  purchase_step_name?: 'ASC' | 'DESC'
}

export class PurchaseStepFilters {
  @ApiProperty({ required: false })
  purchase_step_id?: number

  @ApiProperty({ required: false })
  purchase_step_name?: string
}

export class PurchaseStepFilter {
  @ApiProperty({ required: false })
  offset?: FilterOffset

  @ApiProperty({ required: false })
  filter?: PurchaseStepFilters

  @ApiProperty({ required: false })
  sorts?: PurchaseStepSorts
}
