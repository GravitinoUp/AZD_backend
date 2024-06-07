import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsJSON, IsUUID } from 'class-validator'

export class CreateTechnicalTaskDto {
  @IsUUID()
  @ApiProperty()
  purchase_uuid: string

  @IsJSON()
  @ApiProperty()
  data_json: string
}

export class UpdateTechnicalTaskDto {
  @IsUUID()
  @ApiProperty()
  technical_task_uuid: string

  @IsJSON()
  @IsOptional()
  @ApiProperty({ required: false })
  data_json?: string
}
