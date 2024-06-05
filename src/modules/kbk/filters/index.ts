import { ApiProperty } from '@nestjs/swagger'
import { FilterOffset } from 'src/common/classes/filter_offset'
import { AppStrings } from 'src/common/constants/strings'

//KBK Value
export class KBKValueSorts {
  @ApiProperty({ default: AppStrings.ASC, required: false })
  kbk_value_uuid?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  kbk_type?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  kbk_value?: 'ASC' | 'DESC'
}

export class KBKValueFilters {
  @ApiProperty({ required: false })
  kbk_value_uuid?: string

  @ApiProperty({ required: false })
  kbk_type?: string

  @ApiProperty({ required: false })
  kbk_value?: string
}

export class KBKValueFilter {
  @ApiProperty({ required: false })
  offset?: FilterOffset

  @ApiProperty({ required: false })
  filter?: KBKValueFilters

  @ApiProperty({ required: false })
  sorts?: KBKValueSorts
}

// KBK
export class KBKSorts {
  @ApiProperty({ default: AppStrings.ASC, required: false })
  kbk_name?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  kbk_section?: KBKValueSorts

  @ApiProperty({ default: AppStrings.ASC, required: false })
  kbk_subsection?: KBKValueSorts

  @ApiProperty({ default: AppStrings.ASC, required: false })
  kbk_target_article?: KBKValueSorts

  @ApiProperty({ default: AppStrings.ASC, required: false })
  kbk_expenses_type?: KBKValueSorts
}

export class KBKFilters {
  @ApiProperty({ required: false })
  kbk_name?: string

  @ApiProperty({ required: false })
  kbk_section?: KBKValueFilters

  @ApiProperty({ required: false })
  kbk_subsection?: KBKValueFilters

  @ApiProperty({ required: false })
  kbk_target_article?: KBKValueFilters

  @ApiProperty({ required: false })
  kbk_expenses_type?: KBKValueFilters
}

export class KBKFilter {
  @ApiProperty({ required: false })
  offset?: FilterOffset

  @ApiProperty({ required: false })
  filter?: KBKFilters

  @ApiProperty({ required: false })
  sorts?: KBKSorts
}
