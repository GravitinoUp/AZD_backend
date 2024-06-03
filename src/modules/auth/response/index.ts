import { ApiProperty } from '@nestjs/swagger'

export class AuthResponse {
  @ApiProperty()
  refreshToken: string

  @ApiProperty()
  accessToken: string
}

export class StatusAuthResponse {
  @ApiProperty()
  status: boolean
}
