import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsInt, IsOptional, IsUUID } from 'class-validator'

export class CreateDocumentDto {
  @IsInt()
  @ApiProperty()
  document_type_id: number

  @IsString()
  @ApiProperty()
  document_name: string

  @IsUUID()
  @ApiProperty()
  purchase_uuid: string

  @IsUUID()
  @IsOptional()
  @ApiProperty({ required: false })
  executor_uuid?: string

  @IsUUID()
  @IsOptional()
  @ApiProperty({ required: false })
  executor_person_uuid?: string

  @IsUUID()
  @IsOptional()
  @ApiProperty({ required: false })
  customer_uuid?: string

  @IsUUID()
  @IsOptional()
  @ApiProperty({ required: false })
  customer_person_uuid?: string
}

export class UpdateDocumentDto {
  @IsUUID()
  @ApiProperty()
  document_uuid: string

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  document_type_id?: number

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  document_name?: string

  @IsUUID()
  @IsOptional()
  @ApiProperty({ required: false })
  purchase_uuid?: string

  @IsUUID()
  @IsOptional()
  @ApiProperty({ required: false })
  executor_uuid?: string

  @IsUUID()
  @IsOptional()
  @ApiProperty({ required: false })
  executor_person_uuid?: string

  @IsUUID()
  @IsOptional()
  @ApiProperty({ required: false })
  customer_uuid?: string

  @IsUUID()
  @IsOptional()
  @ApiProperty({ required: false })
  customer_person_uuid?: string
}
