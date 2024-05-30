import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString, IsUUID } from 'class-validator'

export class CreatePlanEventDto {
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
  user_uuid: string

  @IsUUID()
  @ApiProperty()
  plan_uuid: string
}
