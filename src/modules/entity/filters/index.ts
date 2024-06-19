import { ApiProperty } from '@nestjs/swagger'
import { FilterOffset } from 'src/common/classes/filter_offset'
import { AppStrings } from 'src/common/constants/strings'

export class AppEntitySorts {
  @ApiProperty({ default: AppStrings.ASC, required: false })
  entity_id?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  entity_name?: 'ASC' | 'DESC'
}

export class AppEntityFilters {
  @ApiProperty({ default: 1, required: false })
  entity_id?: number

  @ApiProperty({ required: false })
  entity_name?: string
}

export class AppEntityFilter {
  @ApiProperty({ required: false })
  offset?: FilterOffset

  @ApiProperty({ required: false })
  filter?: AppEntityFilters

  @ApiProperty({ required: false })
  sorts?: AppEntitySorts
}
