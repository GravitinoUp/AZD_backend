import { ApiProperty } from '@nestjs/swagger'
import { FilterOffset } from 'src/common/classes/filter_offset'
import { AppStrings } from 'src/common/constants/strings'
import { AgreementStatusFilters, AgreementStatusSorts } from 'src/modules/agreement-status/filters'
import { AppEntityFilters, AppEntitySorts } from 'src/modules/entity/filters'
import { RoleAgreementFilters, RoleAgreementSorts } from 'src/modules/role-agreement/filters'

export class AgreementSorts {
  @ApiProperty({ default: AppStrings.ASC, required: false })
  agreement_uuid?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  role_agreement_uuid?: 'ASC' | 'DESC'

  @ApiProperty({ required: false })
  role_agreement?: RoleAgreementSorts

  @ApiProperty({ default: AppStrings.ASC, required: false })
  agreement_status_id?: 'ASC' | 'DESC'

  @ApiProperty({ required: false })
  agreement_status?: AgreementStatusSorts

  @ApiProperty({ default: AppStrings.ASC, required: false })
  document_uuid?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  entity_id?: 'ASC' | 'DESC'

  @ApiProperty({ required: false })
  entity?: AppEntitySorts
}

export class AgreementFilters {
  @ApiProperty({ required: false })
  agreement_uuid?: string

  @ApiProperty({ required: false })
  role_agreement_uuid?: string

  @ApiProperty({ required: false })
  role_agreement?: RoleAgreementFilters

  @ApiProperty({ required: false })
  agreement_status_id?: number

  @ApiProperty({ required: false })
  agreement_status?: AgreementStatusFilters

  @ApiProperty({ required: false })
  document_uuid?: string

  @ApiProperty({ required: false })
  entity_id?: number

  @ApiProperty({ required: false })
  entity?: AppEntityFilters
}

export class AgreementFilter {
  @ApiProperty({ required: false })
  offset?: FilterOffset

  @ApiProperty({ required: false })
  filter?: AgreementFilters

  @ApiProperty({ required: false })
  sorts?: AgreementSorts
}
