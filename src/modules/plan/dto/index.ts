import { ApiProperty } from '@nestjs/swagger'
import { IsUUID } from 'class-validator'

export class CreatePlanDto {
  @IsUUID()
  @ApiProperty()
  branch_uuid: string
}
