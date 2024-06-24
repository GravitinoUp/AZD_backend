import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional, IsUUID } from 'class-validator'

export class CreateBranchDto {
  @IsString()
  @ApiProperty()
  branch_name: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  branch_address?: string
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
}
