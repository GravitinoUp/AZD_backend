import { ApiProperty } from '@nestjs/swagger'
import { Currency } from 'src/modules/currency/entities/currency.entity'
import { Organization } from 'src/modules/organization/entities/organization.entity'
import { PurchaseStep } from 'src/modules/purchase-step/entities/purchase-step.entity'
import { PurchaseType } from 'src/modules/purchase-type/entities/purchase-type.entity'
import { User } from 'src/modules/user/entities/user.entity'

export class PurchaseResponse {
  @ApiProperty()
  purchase_uuid: string

  @ApiProperty({ required: false })
  purchase_name?: string

  @ApiProperty({ required: false })
  purchase_type_id?: number

  @ApiProperty({ required: false })
  purchase_type?: PurchaseType

  @ApiProperty({ required: false })
  initiator_uuid?: string

  @ApiProperty({ required: false })
  initiator?: User

  @ApiProperty({ required: false })
  executor_uuid?: string

  @ApiProperty({ required: false })
  executor?: Organization

  @ApiProperty({ required: false })
  purchase_identification_code?: string

  @ApiProperty({ required: false })
  contract_identification_code?: string

  @ApiProperty({ required: false })
  start_date?: Date

  @ApiProperty({ required: false })
  end_application_date?: Date

  @ApiProperty({ required: false })
  executor_date?: Date

  @ApiProperty({ required: false })
  end_date?: Date

  @ApiProperty({ required: false })
  start_max_price?: number

  @ApiProperty({ required: false })
  end_price?: number

  @ApiProperty({ required: false })
  currency_code?: string

  @ApiProperty({ required: false })
  currency?: Currency

  @ApiProperty({ required: false })
  purchase_step_id?: number

  @ApiProperty({ required: false })
  purchase_step?: PurchaseStep

  @ApiProperty({ required: false })
  delivery_address?: string

  @ApiProperty({ required: false })
  is_organization_fund?: boolean

  @ApiProperty({ required: false })
  application_enforcement?: number

  @ApiProperty({ required: false })
  is_unilateral_refusal?: boolean

  @ApiProperty({ required: false })
  contract_enforcement?: number

  @ApiProperty({ required: false })
  quality_guarantee_period?: number

  @ApiProperty({ required: false })
  manufacturer_guarantee?: number

  @ApiProperty({ required: false })
  warranty_obligations_enforcement?: number

  @ApiProperty({ required: false })
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
