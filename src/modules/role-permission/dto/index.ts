import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateRolesPermissionDto {
  @Field({ nullable: true })
  role_id?: number

  @Field({ nullable: true })
  user_uuid?: string

  @Field(() => [String])
  permission_ids: string[]

  @Field()
  rights: boolean
}

@InputType()
export class UpdateRolePermissionDto {
  @Field({ nullable: true })
  role_permission_id?: number

  @Field({ nullable: true })
  rights?: boolean
}
