import { ApiProperty } from '@nestjs/swagger'
import { FilterOffset } from 'src/common/classes/filter_offset'
import { AppStrings } from 'src/common/constants/strings'
import { PurchaseFilters, PurchaseSorts } from 'src/modules/purchase/filter'

export class TechnicalTaskSorts {
  @ApiProperty({ default: AppStrings.ASC, required: false })
  technical_task_uuid?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  purchase?: PurchaseSorts
}

export class TechnicalTaskFilters {
  @ApiProperty({ required: false })
  technical_task_uuid?: string

  @ApiProperty({ required: false })
  purchase_uuid?: string

  @ApiProperty({ required: false })
  purchase?: PurchaseFilters
}

export class TechnicalTaskFilter {
  @ApiProperty({ required: false })
  offset?: FilterOffset

  @ApiProperty({ required: false })
  filter?: TechnicalTaskFilters

  @ApiProperty({ required: false })
  sorts?: TechnicalTaskSorts
}
