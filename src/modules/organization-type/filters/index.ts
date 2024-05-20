import { ApiProperty } from '@nestjs/swagger'
import { FilterOffset } from 'src/common/classes/filter_offset'
import { AppStrings } from 'src/common/constants/strings'

export class OrganizationTypeSorts {
  @ApiProperty({ default: AppStrings.ASC, required: false })
  organization_type_id?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  organization_type_name?: 'ASC' | 'DESC'
}

export class OrganizationTypeFilters {
  @ApiProperty({ default: 1, required: false })
  organization_type_id?: number

  @ApiProperty({ required: false })
  organization_type_name?: string
}

export class OrganizationTypeFilter {
  @ApiProperty({ required: false })
  offset?: FilterOffset

  @ApiProperty({ required: false })
  filter?: OrganizationTypeFilters

  @ApiProperty({ required: false })
  sorts?: OrganizationTypeSorts
}
