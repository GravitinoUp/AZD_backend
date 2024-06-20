import { ApiProperty } from '@nestjs/swagger'
import { OrganizationResponse } from 'src/modules/organization/response'
import { PurchaseResponse } from 'src/modules/purchase/response'

export class CommercialOfferResponse {
  @ApiProperty()
  commercial_offer_uuid: string

  @ApiProperty()
  purchase_uuid: string

  @ApiProperty({ required: false })
  purchase?: PurchaseResponse

  @ApiProperty({ required: false })
  organization_uuid: string

  @ApiProperty({ required: false })
  organization?: OrganizationResponse

  @ApiProperty({ required: false })
  sum?: string
}

export class ArrayCommercialOfferResponse {
  @ApiProperty()
  count: number

  @ApiProperty({ required: false, type: CommercialOfferResponse, isArray: true })
  data: CommercialOfferResponse[]
}

export class StatusCommercialOfferResponse {
  @ApiProperty()
  status: boolean

  @ApiProperty({ required: false })
  data?: CommercialOfferResponse
}
