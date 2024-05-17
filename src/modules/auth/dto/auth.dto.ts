import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class AuthDto {
  @IsString()
  @ApiProperty({ default: 'user1@mail.com' })
  email: string

  @IsString()
  @ApiProperty()
  password: string
}

export class CreateAuthDto {
  @IsNumber()
  @ApiProperty()
  user_uuid: string

  @IsString()
  @ApiProperty()
  user_agent: string

  @IsString()
  @ApiProperty()
  ip_address: string
}
