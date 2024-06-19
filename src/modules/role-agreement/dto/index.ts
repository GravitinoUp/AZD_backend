import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsInt, IsUUID, IsOptional } from 'class-validator'

export class CreateRoleAgreementDto {
  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  parent_role_id?: number

  @IsInt()
  @ApiProperty()
  role_id: number

  @IsString()
  @ApiProperty()
  permission_id: string

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

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  permission_id?: string

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  entity_id?: number
}
