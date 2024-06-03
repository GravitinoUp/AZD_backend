import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString, IsUUID } from 'class-validator'

export class CreatePurchaseEventDto {
  @IsString()
  @ApiProperty()
  purchase_event_name: string

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
  purchase_uuid: string
}
