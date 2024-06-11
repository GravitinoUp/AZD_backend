import { ApiProperty } from '@nestjs/swagger'
import { LegalBasis } from 'src/modules/legal-basis/entities/legal-basis.entity'

export class PersonResponse {
  @ApiProperty()
  person_uuid: string

  @ApiProperty()
  last_name: string

  @ApiProperty()
  first_name: string

  @ApiProperty({ required: false })
  patronymic?: string

  @ApiProperty()
  post: string

  @ApiProperty()
  legal_basis: LegalBasis
}

export class ArrayPersonResponse {
  @ApiProperty()
  count: number

  @ApiProperty({ required: false, type: PersonResponse, isArray: true })
  data: PersonResponse[]
}

export class StatusPersonResponse {
  @ApiProperty()
  status: boolean

  @ApiProperty({ required: false })
  data?: PersonResponse
}
