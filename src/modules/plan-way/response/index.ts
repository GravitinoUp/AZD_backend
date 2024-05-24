import { Field, ObjectType } from '@nestjs/graphql'
import { IsString, IsInt, IsArray, IsBoolean, IsOptional } from 'class-validator'

@ObjectType()
export class WayResponse {
  @IsInt()
  @Field()
  way_id: number

  @IsString()
  @Field()
  way_name: string
}

@ObjectType()
export class ArrayWayResponse {
  @IsInt()
  @Field()
  count: number

  @IsArray()
  @Field(() => [WayResponse], { nullable: true })
  data: WayResponse[]
}

@ObjectType()
export class StatusWayResponse {
  @IsBoolean()
  @Field()
  status: boolean

  @IsOptional()
  @Field({ nullable: true })
  data?: WayResponse
}
