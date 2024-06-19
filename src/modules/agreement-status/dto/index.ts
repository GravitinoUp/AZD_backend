import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsInt, IsOptional } from 'class-validator'

export class CreateAgreementStatusDto {
  @IsString()
  @ApiProperty()
  agreement_status_name: string

  @IsInt()
  @ApiProperty()
  entity_id: number
}

export class UpdateAgreementStatusDto {
  @IsInt()
  @ApiProperty()
  agreement_status_id: number

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  agreement_status_name?: string

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  entity_id?: number
}
