import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsString } from 'class-validator'

export class CreateKBKValueDto {
  @IsInt()
  @ApiProperty()
  kbk_type_id: number

  @IsString()
  @ApiProperty()
  kbk_value: string
}
