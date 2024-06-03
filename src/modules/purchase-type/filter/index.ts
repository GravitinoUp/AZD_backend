import { ApiProperty } from '@nestjs/swagger'
import { FilterOffset } from 'src/common/classes/filter_offset'
import { AppStrings } from 'src/common/constants/strings'

export class PurchaseTypeSorts {
  @ApiProperty({ default: AppStrings.ASC, required: false })
  purchase_type_id?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  purchase_type_name?: 'ASC' | 'DESC'
}

export class PurchaseTypeFilters {
  @ApiProperty({ required: false })
  purchase_type_id?: number

  @ApiProperty({ required: false })
  purchase_type_name?: string
}

export class PurchaseTypeFilter {
  @ApiProperty({ required: false })
  offset?: FilterOffset

  @ApiProperty({ required: false })
  filter?: PurchaseTypeFilters

  @ApiProperty({ required: false })
  sorts?: PurchaseTypeSorts
}
