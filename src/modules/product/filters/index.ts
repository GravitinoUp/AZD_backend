import { ApiProperty } from '@nestjs/swagger'
import { FilterOffset } from 'src/common/classes/filter_offset'
import { AppStrings } from 'src/common/constants/strings'
import { OkeiFilters, OkeiSorts } from 'src/modules/okei/filters'

export class ProductSorts {
  @ApiProperty({ default: AppStrings.ASC, required: false })
  product_uuid?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  product_name?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  product_description?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  product_price?: 'ASC' | 'DESC'

  @ApiProperty({ required: false })
  okei?: OkeiSorts
}

export class ProductFilters {
  @ApiProperty({ required: false })
  product_uuid?: string

  @ApiProperty({ required: false })
  product_name?: number

  @ApiProperty({ required: false })
  product_description?: string

  @ApiProperty({ required: false })
  product_price?: number

  @ApiProperty({ required: false })
  okei?: OkeiFilters
}

export class ProductFilter {
  @ApiProperty({ required: false })
  offset?: FilterOffset

  @ApiProperty({ required: false })
  filter?: ProductFilters

  @ApiProperty({ required: false })
  sorts?: ProductSorts
}
