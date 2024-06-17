import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional, IsUUID, IsDecimal } from 'class-validator'

export class CreateProductDto {
  @IsString()
  @ApiProperty()
  product_name: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  product_description?: string

  @IsDecimal()
  @ApiProperty()
  product_price: number

  @IsUUID()
  @ApiProperty()
  okei_uuid: string
}

export class UpdateProductDto {
  @IsUUID()
  @ApiProperty()
  product_uuid: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  product_name?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  product_description?: string

  @IsDecimal()
  @IsOptional()
  @ApiProperty({ required: false })
  product_price?: number

  @IsUUID()
  @IsOptional()
  @ApiProperty({ required: false })
  okei_uuid?: string
}
