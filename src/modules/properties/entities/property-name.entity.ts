import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm'
import { PropertyValue } from './property-value.entity'

@Entity({ name: 'PropertyNames' })
export class PropertyName extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  property_name_uuid: string

  @Column()
  @ApiProperty()
  property_name: string

  @Column()
  @ApiProperty()
  entity_name: string

  @OneToMany(() => PropertyValue, (value) => value.property_name, { cascade: true })
  values: PropertyValue[]
}
