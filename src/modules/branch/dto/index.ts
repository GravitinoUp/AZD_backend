import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional, IsUUID, IsArray } from 'class-validator'

export class CreateBranchDto {
  @IsString()
  @ApiProperty()
  branch_name: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  branch_address?: string

  @IsArray()
  @IsOptional()
  @ApiProperty({ required: false, default: [] })
  property_values?: string[]
}

export class UpdateBranchDto {
  @IsUUID()
  @ApiProperty()
  branch_uuid?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  branch_name?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  branch_address?: string

  @IsArray()
  @IsOptional()
  @ApiProperty({ required: false, default: [] })
  property_values?: string[]
}
