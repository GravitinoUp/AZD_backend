import BaseModel from 'src/common/model'
import { Entity, Column, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { PropertyName } from './property-name.entity'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
@Entity({ name: 'PropertyValues' })
export class PropertyValue extends BaseModel {
  @PrimaryColumn()
  @Field()
  property_value_uuid: string

  @Column()
  @Field()
  property_name_uuid: string

  @ManyToOne(() => PropertyName, (name) => name.values)
  @JoinColumn({ name: 'property_name_uuid', referencedColumnName: 'property_name_uuid' })
  @Field(() => PropertyName)
  property_name: PropertyName

  @Column()
  @Field()
  property_value: string
}
