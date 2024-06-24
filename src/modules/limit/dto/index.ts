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
  @IsUUID()
  @ApiProperty()
  kbk_section_uuid: string

  @IsUUID()
  @ApiProperty()
  kbk_subsection_uuid: string

  @IsUUID()
  @ApiProperty()
  kbk_target_article_uuid: string

  @IsUUID()
  @ApiProperty()
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
  kbk: KBKLimitDto

  @IsEmpty()
  kbk_uuid: string

  @IsUUID()
  @ApiProperty()
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

  @IsUUID()
  @IsOptional()
  @ApiProperty({ required: false })
  kbk_uuid?: string

  @IsUUID()
  @IsOptional()
  @ApiProperty({ required: false })
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
