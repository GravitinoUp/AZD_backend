import { ApiProperty } from '@nestjs/swagger'
import { FilterOffset } from 'src/common/classes/filter_offset'
import { AppStrings } from 'src/common/constants/strings'

export class RoleSorts {
  @ApiProperty({ default: AppStrings.ASC, required: false })
  role_id?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  role_name?: 'ASC' | 'DESC'
}

export class RoleFilters {
  @ApiProperty({ default: 1, required: false })
  role_id?: number

  @ApiProperty({ required: false })
  role_name?: string
}

export class RoleFilter {
  @ApiProperty({ required: false })
  offset?: FilterOffset

  @ApiProperty({ required: false })
  filter?: RoleFilters

  @ApiProperty({ required: false })
  sorts?: RoleSorts
}
