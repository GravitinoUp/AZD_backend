import { ApiProperty } from '@nestjs/swagger'
import { FilterOffset } from 'src/common/classes/filter_offset'
import { AppStrings } from 'src/common/constants/strings'
import { OrganizationFilters, OrganizationSorts } from 'src/modules/organization/filters'
import { PurchaseFilters, PurchaseSorts } from 'src/modules/purchase/filter'

export class CommercialOfferSorts {
  @ApiProperty({ default: AppStrings.ASC, required: false })
  commercial_offer_uuid?: 'ASC' | 'DESC'

  @ApiProperty({ required: false })
  purchase?: PurchaseSorts

  @ApiProperty({ required: false })
  organization?: OrganizationSorts

  @ApiProperty({ default: AppStrings.ASC, required: false })
  sum?: 'ASC' | 'DESC'
}

export class CommercialOfferFilters {
  @ApiProperty({ required: false })
  commercial_offer_uuid?: string

  @ApiProperty({ required: false })
  purchase?: PurchaseFilters

  @ApiProperty({ required: false })
  organization?: OrganizationFilters

  @ApiProperty({ required: false })
  sum?: number
}

export class CommercialOfferFilter {
  @ApiProperty({ required: false })
  offset?: FilterOffset

  @ApiProperty({ required: false })
  filter?: CommercialOfferFilters

  @ApiProperty({ required: false })
  sorts?: CommercialOfferSorts
}
