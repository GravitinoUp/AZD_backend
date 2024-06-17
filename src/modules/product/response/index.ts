import { ApiProperty } from '@nestjs/swagger'
import { OkeiResponse } from 'src/modules/okei/response'

export class ProductResponse {
  @ApiProperty()
  product_uuid: string

  @ApiProperty()
  product_name: string

  @ApiProperty({ required: false })
  product_description: string

  @ApiProperty()
  product_price: number

  @ApiProperty({ required: false })
  okei: OkeiResponse
}

export class ArrayProductResponse {
  @ApiProperty()
  count: number

  @ApiProperty({ required: false, type: ProductResponse, isArray: true })
  data: ProductResponse[]
}

export class StatusProductResponse {
  @ApiProperty()
  status: boolean

  @ApiProperty({ required: false })
  data?: ProductResponse
}
