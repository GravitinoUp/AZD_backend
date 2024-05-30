import { ApiProperty } from '@nestjs/swagger'
import { FilterOffset } from 'src/common/classes/filter_offset'
import { AppStrings } from 'src/common/constants/strings'

export class LegalBasisSorts {
  @ApiProperty({ default: AppStrings.ASC, required: false })
  legal_basis_uuid?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  legal_basis_name?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  legal_basis_number?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  legal_basis_date?: 'ASC' | 'DESC'
}

export class LegalBasisFilters {
  @ApiProperty({ required: false })
  legal_basis_uuid?: string

  @ApiProperty({ required: false })
  legal_basis_name?: string

  @ApiProperty({ required: false })
  legal_basis_number?: string

  @ApiProperty({ required: false })
  legal_basis_date?: Date
}

export class LegalBasisFilter {
  @ApiProperty({ required: false })
  offset?: FilterOffset

  @ApiProperty({ required: false })
  filter?: LegalBasisFilters

  @ApiProperty({ required: false })
  sorts?: LegalBasisSorts
}
