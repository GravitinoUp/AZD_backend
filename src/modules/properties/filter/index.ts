import { ApiProperty } from '@nestjs/swagger'
import { FilterOffset } from 'src/common/classes/filter_offset'
import { AppStrings } from 'src/common/constants/strings'

export class PropertySorts {
  @ApiProperty({ default: AppStrings.ASC, required: false })
  property_name_uuid?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  property_name?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  entity_name?: 'ASC' | 'DESC'
}

export class PropertyFilters {
  @ApiProperty({ required: false })
  property_name_uuid?: string

  @ApiProperty({ required: false })
  property_name?: string

  @ApiProperty({ required: false })
  entity_name?: string
}

export class PropertyFilter {
  @ApiProperty({ required: false })
  offset?: FilterOffset

  @ApiProperty({ required: false })
  filter?: PropertyFilters

  @ApiProperty({ required: false })
  sorts?: PropertySorts
}
