import { ApiProperty } from '@nestjs/swagger'

export class PropertyValueResponse {
  @ApiProperty()
  property_value_uuid: string

  @ApiProperty()
  property_value: string
}

export class PropertyResponse {
  @ApiProperty()
  property_name_uuid: string

  @ApiProperty()
  property_name: string

  @ApiProperty()
  entity_name: string

  @ApiProperty()
  values?: PropertyValueResponse[]
}

export class ArrayPropertyResponse {
  @ApiProperty()
  count: number

  @ApiProperty({ required: false, type: PropertyResponse, isArray: true })
  data: PropertyResponse[]
}

export class StatusPropertyResponse {
  @ApiProperty()
  status: boolean

  @ApiProperty({ required: false })
  data?: PropertyResponse
}
