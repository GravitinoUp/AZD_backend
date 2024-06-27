import { ApiProperty } from '@nestjs/swagger'
import {
  IsString,
  IsOptional,
  IsDecimal,
  IsUUID,
  IsInt,
  ArrayMinSize,
  IsEmpty,
  IsObject,
} from 'class-validator'

export class LimitValueDto {
  @IsEmpty()
  limit_uuid?: string

  @IsInt()
  @ApiProperty()
  limit_value_year: number

  @IsDecimal()
  @ApiProperty()
  rub_value: number

  @IsDecimal()
  @ApiProperty({ required: false })
  currency_value?: number

  @IsString()
  @ApiProperty({ required: false })
  currency_code?: string
}

export class KBKLimitDto {
  @IsString()
  @ApiProperty()
  kbk_name: string

  @IsString()
  @ApiProperty()
  kbk_section: string

  @IsString()
  @ApiProperty()
  kbk_subsection: string

  @IsString()
  @ApiProperty()
  kbk_target_article: string

  @IsString()
  @ApiProperty()
  kbk_expenses_type: string
}

export class KBKValuesDto {
  kbk_name_uuid: string
  kbk_section_uuid: string
  kbk_subsection_uuid: string
  kbk_target_article_uuid: string
  kbk_expenses_type_uuid: string
}

export class CreateLimitDto {
  @IsString()
  @ApiProperty()
  limit_name: string

  @IsString()
  @ApiProperty()
  line_code: string

  @IsObject()
  @ApiProperty()
  kbk_values?: KBKLimitDto

  @IsEmpty()
  kbk_uuid: string

  @IsString()
  @ApiProperty()
  kosgu_code: string

  @IsEmpty()
  kosgu_uuid: string

  @ArrayMinSize(3)
  @ApiProperty({ type: [LimitValueDto] })
  years: LimitValueDto[]

  @IsUUID()
  @ApiProperty()
  branch_uuid: string
}

export class UpdateLimitDto {
  @IsUUID()
  @ApiProperty()
  limit_uuid: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  limit_name?: string

  @IsObject()
  @IsOptional()
  @ApiProperty()
  kbk_values?: KBKLimitDto

  @IsEmpty()
  kbk_uuid?: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  kosgu_code?: string

  @IsEmpty()
  kosgu_uuid?: string

  @ArrayMinSize(3)
  @IsOptional()
  @ApiProperty()
  years?: LimitValueDto[]

  @IsUUID()
  @IsOptional()
  @ApiProperty({ required: false })
  branch_uuid?: string
}
