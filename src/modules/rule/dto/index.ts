import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional, IsUUID } from 'class-validator'

export class CreateRuleDto {
  @IsString()
  @ApiProperty()
  rule_name: string

  @IsString()
  @ApiProperty()
  rule_field_on: string

  @IsString()
  @ApiProperty()
  rule_field_for: string

  @IsString()
  @ApiProperty()
  rule_operator: string

  @IsString()
  @ApiProperty()
  rule_condition_value: string
}

export class UpdateRuleDto {
  @IsUUID()
  @ApiProperty()
  rule_uuid: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  rule_name?: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  rule_operator?: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  rule_condition_value?: string
}
