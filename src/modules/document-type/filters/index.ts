import { ApiProperty } from '@nestjs/swagger'
import { FilterOffset } from 'src/common/classes/filter_offset'
import { AppStrings } from 'src/common/constants/strings'

export class DocumentTypeSorts {
  @ApiProperty({ default: AppStrings.ASC, required: false })
  document_type_id?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  document_type_name?: 'ASC' | 'DESC'
}

export class DocumentTypeFilters {
  @ApiProperty({ default: 1, required: false })
  document_type_id?: number

  @ApiProperty({ required: false })
  document_type_name?: string
}

export class DocumentTypeFilter {
  @ApiProperty({ required: false })
  offset?: FilterOffset

  @ApiProperty({ required: false })
  filter?: DocumentTypeFilters

  @ApiProperty({ required: false })
  sorts?: DocumentTypeSorts
}
