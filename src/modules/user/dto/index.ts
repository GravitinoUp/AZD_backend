import { Field, InputType } from '@nestjs/graphql'
import { IsString, IsOptional, IsUUID } from 'class-validator'

@InputType()
export class CreateUserDto {
  @IsString()
  @Field()
  last_name: string

  @IsString()
  @Field()
  first_name: string

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  patronymic?: string

  @IsString()
  @Field({ nullable: true })
  post?: string

  @IsUUID()
  @Field({ nullable: true })
  legal_basis_uuid?: string

  @IsString()
  @Field()
  email: string

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  phone?: string

  @IsString()
  @Field()
  password: string
}

@InputType()
export class UpdateCurrentUserDto {
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  last_name?: string

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  first_name?: string

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  patronymic?: string

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  post?: string

  @IsUUID()
  @IsOptional()
  @Field({ nullable: true })
  legal_basis_uuid?: string
}

@InputType()
export class UpdateUserPasswordDto {
  @IsString()
  @Field()
  old_password: string

  @IsString()
  @Field()
  password: string
}
