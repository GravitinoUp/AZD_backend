import { ApiProperty } from '@nestjs/swagger'
import { FilterOffset } from 'src/common/classes/filter_offset'
import { AppStrings } from 'src/common/constants/strings'

export class RuleSorts {
  @ApiProperty({ default: AppStrings.ASC, required: false })
  rule_uuid?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  rule_name?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  rule_field_on?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  rule_on_operator?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  rule_on_condition_value?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  rule_field_for?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  rule_for_operator?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  rule_for_condition_value?: 'ASC' | 'DESC'
}

export class RuleFilters {
  @ApiProperty({ required: false })
  rule_uuid?: string

  @ApiProperty({ required: false })
  rule_name?: string

  @ApiProperty({ required: false })
  rule_field_on?: string

  @ApiProperty({ required: false })
  rule_on_operator?: string

  @ApiProperty({ required: false })
  rule_on_condition_value?: string

  @ApiProperty({ required: false })
  rule_field_for?: string

  @ApiProperty({ required: false })
  rule_for_operator?: string

  @ApiProperty({ required: false })
  rule_for_condition_value?: string
}

export class RuleFilter {
  @ApiProperty({ required: false })
  offset?: FilterOffset

  @ApiProperty({ required: false })
  filter?: RuleFilters

  @ApiProperty({ required: false })
  sorts?: RuleSorts
}
