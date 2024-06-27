import { ApiProperty } from '@nestjs/swagger'

export class RuleResponse {
  @ApiProperty()
  rule_uuid: string

  @ApiProperty()
  rule_name: string

  @ApiProperty()
  rule_field_on: string

  @ApiProperty()
  rule_field_for: string

  @ApiProperty()
  rule_operator: string

  @ApiProperty()
  rule_condition_value: string
}

export class ArrayRuleResponse {
  @ApiProperty()
  count: number

  @ApiProperty({ required: false, type: RuleResponse, isArray: true })
  data: RuleResponse[]
}

export class StatusRuleResponse {
  @ApiProperty()
  status: boolean

  @ApiProperty({ required: false })
  data?: RuleResponse
}
