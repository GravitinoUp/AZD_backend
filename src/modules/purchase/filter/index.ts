import { ApiProperty } from '@nestjs/swagger'
import { FilterOffset } from 'src/common/classes/filter_offset'
import { AppStrings } from 'src/common/constants/strings'
import { CurrencyFilters, CurrencySorts } from 'src/modules/currency/filters'
import { OrganizationFilters, OrganizationSorts } from 'src/modules/organization/filters'
import { PurchaseStepFilters, PurchaseStepSorts } from 'src/modules/purchase-step/filter'
import { PurchaseTypeFilters, PurchaseTypeSorts } from 'src/modules/purchase-type/filter'
import { UserFilters, UserSorts } from 'src/modules/user/filters'

export class PurchaseSorts {
  @ApiProperty({ default: AppStrings.ASC, required: false })
  purchase_uuid?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  purchase_name?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  purchase_type?: PurchaseTypeSorts

  @ApiProperty({ default: AppStrings.ASC, required: false })
  initiator?: UserSorts

  @ApiProperty({ default: AppStrings.ASC, required: false })
  executor?: OrganizationSorts

  @ApiProperty({ default: AppStrings.ASC, required: false })
  purchase_identification_code?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  contract_identification_code?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  start_date?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  end_date?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  start_max_price?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  end_price?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  currency?: CurrencySorts

  @ApiProperty({ default: AppStrings.ASC, required: false })
  purchase_step?: PurchaseStepSorts

  @ApiProperty({ default: AppStrings.ASC, required: false })
  delivery_address?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  is_organization_fund?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  application_enforcement?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  is_unilateral_refusal?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  contract_enforcement?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  quality_guarantee_period?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  manufacturer_guarantee?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  warranty_obligations_enforcement?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  additional_info?: 'ASC' | 'DESC'
}

export class PurchaseFilters {
  @ApiProperty({ required: false })
  purchase_uuid?: string

  @ApiProperty({ required: false })
  purchase_name?: string

  @ApiProperty({ required: false })
  purchase_type?: PurchaseTypeFilters

  @ApiProperty({ required: false })
  initiator?: UserFilters

  @ApiProperty({ required: false })
  executor?: OrganizationFilters

  @ApiProperty({ required: false })
  purchase_identification_code?: string

  @ApiProperty({ required: false })
  contract_identification_code?: string

  @ApiProperty({ required: false })
  start_date?: Date

  @ApiProperty({ required: false })
  end_date?: Date

  @ApiProperty({ required: false })
  start_max_price?: number

  @ApiProperty({ required: false })
  end_price?: number

  @ApiProperty({ required: false })
  currency?: CurrencyFilters

  @ApiProperty({ required: false })
  purchase_step?: PurchaseStepFilters

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

export class PurchaseFilter {
  @ApiProperty({ required: false })
  offset?: FilterOffset

  @ApiProperty({ required: false })
  filter?: PurchaseFilters

  @ApiProperty({ required: false })
  sorts?: PurchaseSorts
}
