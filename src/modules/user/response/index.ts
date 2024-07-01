import { ApiProperty } from '@nestjs/swagger'
import { AppStrings } from 'src/common/constants/strings'

export class UserResponse {
  @ApiProperty()
  user_uuid: string

  @ApiProperty()
  person_uuid: string

  @ApiProperty()
  role_id: number

  @ApiProperty()
  is_active: boolean

  @ApiProperty()
  email: string

  @ApiProperty({ required: false })
  phone?: string

  @ApiProperty()
  password: string

  @ApiProperty({ description: AppStrings.PROPERTY_VALUES })
  property_values: string[]
}

export class ArrayUserResponse {
  @ApiProperty()
  count: number

  @ApiProperty({ required: false, type: UserResponse, isArray: true })
  data: UserResponse[]
}

export class StatusUserResponse {
  @ApiProperty()
  status: boolean

  @ApiProperty({ required: false })
  data?: UserResponse
}
