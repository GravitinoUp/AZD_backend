import { ApiProperty } from '@nestjs/swagger'
import { FilterOffset } from 'src/common/classes/filter_offset'
import { AppStrings } from 'src/common/constants/strings'
import { AppEntityFilters, AppEntitySorts } from 'src/modules/entity/filters'

export class AgreementStatusSorts {
  @ApiProperty({ default: AppStrings.ASC, required: false })
  agreement_status_id?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  agreement_status_name?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  entity_id?: 'ASC' | 'DESC'

  @ApiProperty({ required: false })
  entity?: AppEntitySorts
}

export class AgreementStatusFilters {
  @ApiProperty({ required: false })
  agreement_status_id?: number

  @ApiProperty({ required: false })
  agreement_status_name?: string

  @ApiProperty({ required: false })
  entity_id?: number

  @ApiProperty({ required: false })
  entity?: AppEntityFilters
}

export class AgreementStatusFilter {
  @ApiProperty({ required: false })
  offset?: FilterOffset

  @ApiProperty({ required: false })
  filter?: AgreementStatusFilters

  @ApiProperty({ required: false })
  sorts?: AgreementStatusSorts
}
