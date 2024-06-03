import { ApiProperty } from '@nestjs/swagger'

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
