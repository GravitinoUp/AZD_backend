import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsOptional, IsUUID } from 'class-validator'

export class CreateAgreementsDto {
  @IsUUID()
  @ApiProperty()
  document_uuid: string

  @IsInt()
  @ApiProperty()
  entity_id: number
}

export class UpdateAgreementDto {
  @IsUUID()
  @ApiProperty()
  document_uuid: string

  @IsInt()
  @ApiProperty()
  entity_id: number

  // @IsUUID()
  // @IsOptional()
  // @ApiProperty()
  // role_agreement_uuid?: string

  @IsInt()
  @IsOptional()
  @ApiProperty()
  agreement_status_id?: number

  // @IsUUID()
  // @IsOptional()
  // @ApiProperty()
  // document_uuid?: string

  // @IsInt()
  // @IsOptional()
  // @ApiProperty()
  // entity_id?: number
}
