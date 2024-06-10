import { ApiProperty } from '@nestjs/swagger'

export class WayResponse {
  @ApiProperty()
  way_id: number

  @ApiProperty()
  way_name: string
}

export class ArrayWayResponse {
  @ApiProperty()
  count: number

  @ApiProperty({ required: false, type: WayResponse, isArray: true })
  data: WayResponse[]
}

export class StatusWayResponse {
  @ApiProperty()
  status: boolean

  @ApiProperty({ required: false })
  data?: WayResponse
}
