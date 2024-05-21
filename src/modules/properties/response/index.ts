import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsBoolean, IsInt, IsOptional, IsString, IsUUID } from 'class-validator'

export class PropertyValueResponse {
  @IsUUID()
  @ApiProperty()
  property_value_uuid: string

  @IsString()
  @ApiProperty()
  property_value: string
}

export class PropertyResponse {
  @IsUUID()
  @ApiProperty()
  property_name_uuid: string

  @IsString()
  @ApiProperty()
  property_name: string

  @IsString()
  @ApiProperty()
  entity_name: string

  @IsOptional()
  @ApiProperty()
  values?: PropertyValueResponse[]
}

export class ArrayPropertyResponse {
  @IsInt()
  @ApiProperty()
  count: number

  @IsArray()
  @ApiProperty({ required: false, type: PropertyResponse, isArray: true })
  data: PropertyResponse[]
}

export class StatusPropertyResponse {
  @IsBoolean()
  @ApiProperty()
  status: boolean

  @IsOptional()
  @ApiProperty({ required: false })
  data?: PropertyResponse
}
