import { ApiProperty } from '@nestjs/swagger'

export class OrganizationTypeResponse {
  @ApiProperty()
  organization_type_id: number

  @ApiProperty()
  organization_type_name: string
}

export class ArrayOrganizationTypeResponse {
  @ApiProperty()
  count: number

  @ApiProperty({ required: false, type: OrganizationTypeResponse, isArray: true })
  data: OrganizationTypeResponse[]
}

export class StatusOrganizationTypeResponse {
  @ApiProperty()
  status: boolean

  @ApiProperty({ required: false })
  data?: OrganizationTypeResponse
}
