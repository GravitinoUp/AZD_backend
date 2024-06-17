import { ApiProperty } from '@nestjs/swagger'

export class DocumentTypeResponse {
  @ApiProperty()
  document_type_id: number

  @ApiProperty()
  document_type_name: string
}

export class ArrayDocumentTypeResponse {
  @ApiProperty()
  count: number

  @ApiProperty({ required: false, type: DocumentTypeResponse, isArray: true })
  data: DocumentTypeResponse[]
}

export class StatusDocumentTypeResponse {
  @ApiProperty()
  status: boolean

  @ApiProperty({ required: false })
  data?: DocumentTypeResponse
}
