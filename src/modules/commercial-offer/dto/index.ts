import { ApiProperty } from '@nestjs/swagger'
import { IsDecimal, IsOptional, IsUUID } from 'class-validator'

export class CreateCommercialOfferDto {
  @IsUUID()
  @ApiProperty()
  purchase_uuid: string

  @IsUUID()
  @ApiProperty()
  organization_uuid: string
}

export class UpdateCommercialOfferDto {
  @IsUUID()
  @ApiProperty()
  commercial_offer_uuid: string

  @IsDecimal()
  @IsOptional()
  @ApiProperty({ required: false })
  sum?: number
}
