import { ApiProperty } from '@nestjs/swagger'
import { ArrayMinSize, IsArray, IsDecimal, IsEmail, IsString, IsUUID } from 'class-validator'

export class CreateCommercialOfferDto {
  @IsUUID()
  @ApiProperty()
  purchase_uuid: string

  @IsString()
  @ApiProperty()
  commercial_offer_text: string

  @ArrayMinSize(1) // TODO
  @IsArray()
  @ApiProperty()
  organizations: string[]
}

export class UpdateCommercialOfferDto {
  @IsUUID()
  @ApiProperty()
  commercial_offer_uuid: string

  @IsDecimal()
  @ApiProperty()
  sum: number
}

export class BulkUpdateCommercialOfferDto {
  // @ArrayMinSize(3)
  @IsArray()
  @ApiProperty({ type: [UpdateCommercialOfferDto] })
  offers: UpdateCommercialOfferDto[]
}

export class SendCommercialOfferDto {
  @IsEmail()
  @ApiProperty()
  email: string

  @IsString()
  @ApiProperty()
  purchase_name: string

  @IsString()
  @ApiProperty()
  commercial_offer_text: string
}
