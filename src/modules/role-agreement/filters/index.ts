import { ApiProperty } from '@nestjs/swagger'
import { FilterOffset } from 'src/common/classes/filter_offset'
import { AppStrings } from 'src/common/constants/strings'
import { AppEntityFilters, AppEntitySorts } from 'src/modules/entity/filters'
import { RoleFilters, RoleSorts } from 'src/modules/role/filters'

export class RoleAgreementSorts {
  @ApiProperty({ default: AppStrings.ASC, required: false })
  role_agreement_uuid?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  parent_role_id?: 'ASC' | 'DESC'

  @ApiProperty({ required: false })
  parent_role?: RoleSorts

  @ApiProperty({ default: AppStrings.ASC, required: false })
  role_id?: 'ASC' | 'DESC'

  @ApiProperty({ required: false })
  role?: RoleSorts

  @ApiProperty({ default: AppStrings.ASC, required: false })
  permission_id?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  entity_id?: 'ASC' | 'DESC'

  @ApiProperty({ required: false })
  entity?: AppEntitySorts
}

export class RoleAgreementFilters {
  @ApiProperty({ required: false })
  role_agreement_uuid?: string

  @ApiProperty({ required: false })
  parent_role_id?: number

  @ApiProperty({ required: false })
  parent_role?: RoleFilters

  @ApiProperty({ required: false })
  role_id?: number

  @ApiProperty({ required: false })
  role?: RoleFilters

  @ApiProperty({ required: false })
  permission_id?: string

  @ApiProperty({ required: false })
  entity_id?: number

  @ApiProperty({ required: false })
  entity?: AppEntityFilters
}

export class RoleAgreementFilter {
  @ApiProperty({ required: false })
  offset?: FilterOffset

  @ApiProperty({ required: false })
  filter?: RoleAgreementFilters

  @ApiProperty({ required: false })
  sorts?: RoleAgreementSorts
}
