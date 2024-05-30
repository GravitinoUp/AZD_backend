import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsBoolean, IsDate, IsInt, IsOptional, IsString, IsUUID } from 'class-validator'

export class PlanEventResponse {
  @IsString()
  @ApiProperty()
  plan_event_uuid: string

  @IsString()
  @ApiProperty()
  plan_event_name: string

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
  plan_uuid: string

  @IsUUID()
  @ApiProperty()
  user_uuid: string

  @IsDate()
  @ApiProperty()
  created_at: Date
}

export class ArrayPlanEventResponse {
  @IsInt()
  @ApiProperty()
  count: number

  @IsArray()
  @ApiProperty({ required: false, type: PlanEventResponse, isArray: true })
  data: PlanEventResponse[]
}

export class StatusPlanEventResponse {
  @IsBoolean()
  @ApiProperty()
  status: boolean

  @IsOptional()
  @ApiProperty({ required: false })
  data?: PlanEventResponse
}
