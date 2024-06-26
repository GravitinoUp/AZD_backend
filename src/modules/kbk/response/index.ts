import { ApiProperty } from '@nestjs/swagger'

// KBK Type
export class KBKTypeResponse {
  @ApiProperty()
  kbk_type_id: number

  @ApiProperty()
  kbk_type_name: string
}

export class ArrayKBKTypeResponse {
  @ApiProperty()
  count: number

  @ApiProperty({ required: false, type: KBKTypeResponse, isArray: true })
  data: KBKTypeResponse[]
}

export class StatusKBKTypeResponse {
  @ApiProperty()
  status: boolean

  @ApiProperty({ required: false })
  data?: KBKTypeResponse
}

// KBK Value
export class KBKValueResponse {
  @ApiProperty()
  kbk_value_uuid: string

  @ApiProperty()
  kbk_type_id: number

  @ApiProperty({ required: false })
  kbk_type?: KBKTypeResponse

  @ApiProperty()
  kbk_value: string
}

export class ArrayKBKValueResponse {
  @ApiProperty()
  count: number

  @ApiProperty({ required: false, type: KBKValueResponse, isArray: true })
  data: KBKValueResponse[]
}

export class StatusKBKValueResponse {
  @ApiProperty()
  status: boolean

  @ApiProperty({ required: false })
  data?: KBKValueResponse
}

// KBK
export class KBKResponse {
  @ApiProperty()
  kbk_uuid: string

  @ApiProperty()
  kbk_name_uuid: string

  @ApiProperty({ required: false })
  kbk_name?: KBKValueResponse

  @ApiProperty()
  kbk_section_uuid: string

  @ApiProperty({ required: false })
  kbk_section?: KBKValueResponse

  @ApiProperty()
  kbk_subsection_uuid: string

  @ApiProperty({ required: false })
  kbk_subsection?: KBKValueResponse

  @ApiProperty()
  kbk_target_article_uuid: string

  @ApiProperty({ required: false })
  kbk_target_article?: KBKValueResponse

  @ApiProperty()
  kbk_expenses_type_uuid: string

  @ApiProperty({ required: false })
  kbk_expenses_type?: KBKValueResponse
}

export class ArrayKBKResponse {
  @ApiProperty()
  count: number

  @ApiProperty({ required: false, type: KBKResponse, isArray: true })
  data: KBKResponse[]
}

export class StatusKBKResponse {
  @ApiProperty()
  status: boolean

  @ApiProperty({ required: false })
  data?: KBKResponse
}
