import { Field, InputType, Int } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { FilterOffset } from 'src/common/classes/filter_offset'
import { AppStrings } from 'src/common/constants/strings'

@InputType()
export class RoleSorts {
  @ApiProperty({ default: AppStrings.ASC, required: false })
  @Field({ nullable: true })
  role_id?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  @Field({ nullable: true })
  role_name?: 'ASC' | 'DESC'
}

@InputType()
export class RoleFilters {
  @ApiProperty({ default: 1, required: false })
  @Field(() => Int, { nullable: true })
  role_id?: number

  @ApiProperty({ required: false })
  @Field({ nullable: true })
  role_name?: string
}

@InputType()
export class RoleFilter {
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  offset?: FilterOffset

  @ApiProperty({ required: false })
  @Field({ nullable: true })
  filter?: RoleFilters

  @ApiProperty({ required: false })
  @Field({ nullable: true })
  sorts?: RoleSorts
}
