import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsBoolean, IsDate, IsInt, IsOptional, IsString, IsUUID } from 'class-validator'

export class LimitEventResponse {
  @IsString()
  @ApiProperty()
  limit_event_uuid: string

  @IsString()
  @ApiProperty()
  limit_event_name: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  old_value?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  new_value?: string

  @IsUUID()
  @ApiProperty()
  limit_uuid: string

  @IsUUID()
  @ApiProperty()
  user_uuid: string

  @IsDate()
  @ApiProperty()
  created_at: Date
}

export class ArrayLimitEventResponse {
  @IsInt()
  @ApiProperty()
  count: number

  @IsArray()
  @ApiProperty({ required: false, type: LimitEventResponse, isArray: true })
  data: LimitEventResponse[]
}

export class StatusLimitEventResponse {
  @IsBoolean()
  @ApiProperty()
  status: boolean

  @IsOptional()
  @ApiProperty({ required: false })
  data?: LimitEventResponse
}
