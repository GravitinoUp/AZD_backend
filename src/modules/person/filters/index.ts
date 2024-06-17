import { ApiProperty } from '@nestjs/swagger'
import { FilterOffset } from 'src/common/classes/filter_offset'
import { AppStrings } from 'src/common/constants/strings'
import { LegalBasisFilters, LegalBasisSorts } from 'src/modules/legal-basis/filters'

export class PersonSorts {
  @ApiProperty({ default: AppStrings.ASC, required: false })
  person_uuid?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  last_name?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  first_name?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  patronymic?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  post?: 'ASC' | 'DESC'

  @ApiProperty({ required: false })
  legal_basis?: LegalBasisSorts
}

export class PersonFilters {
  @ApiProperty({ required: false })
  person_uuid?: string

  @ApiProperty({ required: false })
  last_name?: string

  @ApiProperty({ required: false })
  first_name?: string

  @ApiProperty({ required: false })
  patronymic?: string

  @ApiProperty({ required: false })
  post?: string

  @ApiProperty({ required: false })
  legal_basis?: LegalBasisFilters
}

export class PersonFilter {
  @ApiProperty({ required: false })
  offset?: FilterOffset

  @ApiProperty({ required: false })
  filter?: PersonFilters

  @ApiProperty({ required: false })
  sorts?: PersonSorts
}
