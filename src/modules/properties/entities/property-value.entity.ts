import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Entity, Column, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { PropertyName } from './property-name.entity'

@Entity({ name: 'PropertyValues' })
export class PropertyValue extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  property_value_uuid: string

  @Column()
  @ApiProperty()
  property_name_uuid: string

  @ManyToOne(() => PropertyName, (name) => name.values)
  @JoinColumn({ name: 'property_name_uuid', referencedColumnName: 'property_name_uuid' })
  @ApiProperty()
  property_name: PropertyName

  @Column()
  @ApiProperty()
  property_value: string
}
