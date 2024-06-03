import { ApiProperty } from '@nestjs/swagger'
import { FilterOffset } from 'src/common/classes/filter_offset'
import { AppStrings } from 'src/common/constants/strings'
import { PurchaseFilters, PurchaseSorts } from 'src/modules/purchase/filter'
import { UserFilters, UserSorts } from 'src/modules/user/filters'

export class PurchaseEventSorts {
  @ApiProperty({ default: AppStrings.ASC, required: false })
  purchase_event_uuid?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  purchase_event_name?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  old_value?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  new_value?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  purchase?: PurchaseSorts

  @ApiProperty({ default: AppStrings.ASC, required: false })
  user?: UserSorts

  @ApiProperty({ default: AppStrings.ASC, required: false })
  created_at?: 'ASC' | 'DESC'
}

export class PurchaseEventFilters {
  @ApiProperty({ required: false })
  purchase_event_uuid?: string

  @ApiProperty({ required: false })
  purchase_event_name?: string

  @ApiProperty({ required: false })
  old_value?: string

  @ApiProperty({ required: false })
  new_value?: string

  @ApiProperty({ required: false })
  purchase?: PurchaseFilters

  @ApiProperty({ required: false })
  user?: UserFilters

  @ApiProperty({ required: false })
  created_at?: Date
}

export class PurchaseEventFilter {
  @ApiProperty({ required: false })
  offset?: FilterOffset

  @ApiProperty({ required: false })
  filter?: PurchaseEventFilters

  @ApiProperty({ required: false })
  sorts?: PurchaseEventSorts
}
