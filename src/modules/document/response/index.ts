import { ApiProperty } from '@nestjs/swagger'
import { DocumentTypeResponse } from 'src/modules/document-type/response'
import { OrganizationResponse } from 'src/modules/organization/response'
import { PersonResponse } from 'src/modules/person/response'
import { PurchaseResponse } from 'src/modules/purchase/response'

export class DocumentResponse {
  @ApiProperty()
  document_uuid: string

  @ApiProperty()
  document_type_id: number

  @ApiProperty({ required: false })
  document_type?: DocumentTypeResponse

  @ApiProperty()
  document_name: string

  @ApiProperty()
  purchase_uuid: string

  @ApiProperty({ required: false })
  purchase?: PurchaseResponse

  @ApiProperty({ required: false })
  executor_uuid?: string

  @ApiProperty({ required: false })
  executor?: OrganizationResponse

  @ApiProperty({ required: false })
  executor_person_uuid?: string

  @ApiProperty({ required: false })
  executor_person?: PersonResponse

  @ApiProperty({ required: false })
  customer_uuid?: string

  @ApiProperty({ required: false })
  customer?: OrganizationResponse

  @ApiProperty({ required: false })
  customer_person_uuid?: string

  @ApiProperty({ required: false })
  customer_person?: PersonResponse
}

export class ArrayDocumentResponse {
  @ApiProperty()
  count: number

  @ApiProperty({ required: false, type: DocumentResponse, isArray: true })
  data: DocumentResponse[]
}

export class StatusDocumentResponse {
  @ApiProperty()
  status: boolean

  @ApiProperty({ required: false })
  data?: DocumentResponse
}
