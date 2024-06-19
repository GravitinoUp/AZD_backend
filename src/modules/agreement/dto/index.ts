import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsOptional, IsUUID, IsBoolean } from 'class-validator'

export class CreateAgreementDto {
  @IsUUID()
  @ApiProperty()
  role_agreement_uuid: string

  @IsInt()
  @ApiProperty()
  agreement_status_id: number

  @IsUUID()
  @ApiProperty()
  document_uuid: string

  @IsInt()
  @ApiProperty()
  entity_id: number

  @IsBoolean()
  @ApiProperty()
  is_verified: boolean
}

export class UpdateAgreementDto {
  @IsUUID()
  @ApiProperty()
  agreement_uuid: string

  @IsUUID()
  @IsOptional()
  @ApiProperty()
  role_agreement_uuid?: string

  @IsInt()
  @IsOptional()
  @ApiProperty()
  agreement_status_id?: number

  @IsUUID()
  @IsOptional()
  @ApiProperty()
  document_uuid?: string

  @IsInt()
  @IsOptional()
  @ApiProperty()
  entity_id?: number

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  is_verified?: boolean
}
