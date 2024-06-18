import { ApiProperty } from '@nestjs/swagger'
import { FilterOffset } from 'src/common/classes/filter_offset'
import { AppStrings } from 'src/common/constants/strings'
import { DocumentTypeFilters, DocumentTypeSorts } from 'src/modules/document-type/filters'
import { OrganizationFilters, OrganizationSorts } from 'src/modules/organization/filters'
import { PersonFilters, PersonSorts } from 'src/modules/person/filters'
import { PurchaseFilters, PurchaseSorts } from 'src/modules/purchase/filter'

export class DocumentSorts {
  @ApiProperty({ default: AppStrings.ASC, required: false })
  document_uuid?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  document_type_id?: 'ASC' | 'DESC'

  @ApiProperty({ required: false })
  document_type?: DocumentTypeSorts

  @ApiProperty({ default: AppStrings.ASC, required: false })
  document_name?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  purchase_uuid?: 'ASC' | 'DESC'

  @ApiProperty({ required: false })
  purchase?: PurchaseSorts

  @ApiProperty({ required: false })
  executor?: OrganizationSorts

  @ApiProperty({ required: false })
  executor_person?: PersonSorts

  @ApiProperty({ required: false })
  customer?: OrganizationSorts

  @ApiProperty({ required: false })
  customer_person?: PersonSorts
}

export class DocumentFilters {
  @ApiProperty({ required: false })
  document_uuid?: string

  @ApiProperty({ required: false })
  document_type_id?: number

  @ApiProperty({ required: false })
  document_type?: DocumentTypeFilters

  @ApiProperty({ required: false })
  document_name?: string

  @ApiProperty({ required: false })
  purchase_uuid?: string

  @ApiProperty({ required: false })
  purchase?: PurchaseFilters

  @ApiProperty({ required: false })
  executor?: OrganizationFilters

  @ApiProperty({ required: false })
  executor_person?: PersonFilters

  @ApiProperty({ required: false })
  customer?: OrganizationFilters

  @ApiProperty({ required: false })
  customer_person?: PersonFilters
}

export class DocumentFilter {
  @ApiProperty({ required: false })
  offset?: FilterOffset

  @ApiProperty({ required: false })
  filter?: DocumentFilters

  @ApiProperty({ required: false })
  sorts?: DocumentSorts
}
