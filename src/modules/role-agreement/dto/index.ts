import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsUUID, IsOptional } from 'class-validator'

export class CreateRoleAgreementDto {
  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  parent_role_id?: number

  @IsInt()
  @ApiProperty()
  role_id: number

  @IsInt()
  @ApiProperty()
  entity_id: number
}

export class UpdateRoleAgreementDto {
  @IsUUID()
  @ApiProperty()
  role_agreement_uuid: string

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  parent_role_id?: number

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  role_id?: number

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  entity_id?: number
}
