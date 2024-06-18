import { ApiProperty } from '@nestjs/swagger'

export class AppEntityResponse {
  @ApiProperty()
  entity_id: number

  @ApiProperty()
  entity_name: string
}

export class ArrayAppEntityResponse {
  @ApiProperty()
  count: number

  @ApiProperty({ required: false, type: AppEntityResponse, isArray: true })
  data: AppEntityResponse[]
}

export class StatusAppEntityResponse {
  @ApiProperty()
  status: boolean

  @ApiProperty({ required: false })
  data?: AppEntityResponse
}
