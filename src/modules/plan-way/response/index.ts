import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsInt, IsArray, IsBoolean, IsOptional } from "class-validator"

export class WayResponse {
    @IsInt()
    @ApiProperty()
    way_id: number

    @IsString()
    @ApiProperty()
    way_name: string
}

export class ArrayWayResponse {
    @IsInt()
    @ApiProperty()
    count: number

    @IsArray()
    @ApiProperty({ required: false, type: WayResponse, isArray: true })
    data: WayResponse[]
}

export class StatusWayResponse {
    @IsBoolean()
    @ApiProperty()
    status: boolean

    @IsOptional()
    @ApiProperty({ required: false })
    data?: WayResponse
}
