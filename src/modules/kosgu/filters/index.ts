import { ApiProperty } from '@nestjs/swagger'
import { FilterOffset } from 'src/common/classes/filter_offset'
import { AppStrings } from 'src/common/constants/strings'

export class KosguSorts {
  @ApiProperty({ default: AppStrings.ASC, required: false })
  kosgu_uuid?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  kosgu_code?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  kosgu_name?: 'ASC' | 'DESC'
}

export class KosguFilters {
  @ApiProperty({ required: false })
  kosgu_uuid?: string

  @ApiProperty({ required: false })
  kosgu_code?: string

  @ApiProperty({ required: false })
  kosgu_name?: string
}

export class KosguFilter {
  @ApiProperty({ required: false })
  offset?: FilterOffset

  @ApiProperty({ required: false })
  filter?: KosguFilters

  @ApiProperty({ required: false })
  sorts?: KosguSorts
}
