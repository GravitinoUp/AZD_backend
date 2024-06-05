import { ApiProperty } from '@nestjs/swagger'
import { Currency } from 'src/modules/currency/entities/currency.entity'
import { Organization } from 'src/modules/organization/entities/organization.entity'
import { PurchaseStep } from 'src/modules/purchase-step/entities/purchase-step.entity'
import { PurchaseType } from 'src/modules/purchase-type/entities/purchase-type.entity'
import { User } from 'src/modules/user/entities/user.entity'

export class PurchaseResponse {
  @ApiProperty()
  purchase_uuid?: string

  @ApiProperty()
  purchase_name?: string

  @ApiProperty()
  purchase_type_id: number

  @ApiProperty()
  purchase_type?: PurchaseType

  @ApiProperty()
  initiator_uuid: string

  @ApiProperty()
  initiator?: User

  @ApiProperty()
  executor_uuid?: string

  @ApiProperty()
  executor?: Organization

  @ApiProperty()
  purchase_identification_code?: string

  @ApiProperty()
  contract_identification_code?: string

  @ApiProperty()
  start_date?: Date

  @ApiProperty()
  end_application_date?: Date

  @ApiProperty()
  executor_date?: Date

  @ApiProperty()
  end_date: Date

  @ApiProperty()
  start_max_price?: number

  @ApiProperty()
  end_price?: number

  @ApiProperty()
  currency_code: string

  @ApiProperty()
  currency?: Currency

  @ApiProperty()
  purchase_step_id: number

  @ApiProperty()
  purchase_step?: PurchaseStep

  @ApiProperty()
  delivery_address: string

  @ApiProperty()
  is_organization_fund: boolean

  @ApiProperty()
  application_enforcement?: number

  @ApiProperty()
  is_unilateral_refusal: boolean

  @ApiProperty()
  contract_enforcement?: number

  @ApiProperty()
  quality_guarantee_period: number

  @ApiProperty()
  manufacturer_guarantee?: number

  @ApiProperty()
  warranty_obligations_enforcement?: number

  @ApiProperty()
  additional_info?: string
}

export class ArrayPurchaseResponse {
  @ApiProperty()
  count: number

  @ApiProperty({ required: false, type: PurchaseResponse, isArray: true })
  data?: PurchaseResponse[]
}

export class StatusPurchaseResponse {
  @ApiProperty()
  status: boolean

  @ApiProperty({ required: false })
  data?: PurchaseResponse
}
