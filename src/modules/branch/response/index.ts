import { ApiProperty } from '@nestjs/swagger'
import { AppStrings } from 'src/common/constants/strings'

export class BranchResponse {
  @ApiProperty()
  branch_uuid: string

  @ApiProperty()
  branch_name: string

  @ApiProperty({ required: false })
  branch_address?: string

  @ApiProperty({ description: AppStrings.PROPERTY_VALUES })
  property_values: string[]
}

export class ArrayBranchResponse {
  @ApiProperty()
  count: number

  @ApiProperty({ required: false, type: BranchResponse, isArray: true })
  data: BranchResponse[]
}

export class StatusBranchResponse {
  @ApiProperty()
  status: boolean

  @ApiProperty({ required: false })
  data?: BranchResponse
}
