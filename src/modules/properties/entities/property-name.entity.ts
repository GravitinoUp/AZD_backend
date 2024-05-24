import BaseModel from 'src/common/model'
import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm'
import { PropertyValue } from './property-value.entity'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
@Entity({ name: 'PropertyNames' })
export class PropertyName extends BaseModel {
  @PrimaryColumn()
  @Field()
  property_name_uuid: string

  @Column()
  @Field()
  property_name: string

  @Column()
  @Field()
  entity_name: string

  @OneToMany(() => PropertyValue, (value) => value.property_name, { cascade: true })
  values: PropertyValue[]
}
