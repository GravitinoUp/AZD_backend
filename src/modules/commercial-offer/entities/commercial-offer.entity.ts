import { ApiProperty } from '@nestjs/swagger'
import { Entity, PrimaryColumn, Column, JoinColumn, ManyToOne } from 'typeorm'
import BaseModel from 'src/common/model'
import { Organization } from 'src/modules/organization/entities/organization.entity'
import { Purchase } from 'src/modules/purchase/entities/purchase.entity'

@Entity({ name: 'CommercialOffers' })
export class CommercialOffer extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  commercial_offer_uuid: string

  @Column()
  @ApiProperty()
  purchase_uuid: string

  @ManyToOne(() => Purchase, (purchase) => purchase.commercial_offers)
  @JoinColumn({ name: 'purchase_uuid', referencedColumnName: 'purchase_uuid' })
  @ApiProperty({ required: false })
  purchase?: Purchase

  @Column({ type: 'text' })
  @ApiProperty()
  commercial_offer_text: string

  @Column()
  @ApiProperty()
  organization_uuid: string

  @ManyToOne(() => Organization, (organization) => organization.commercial_offers)
  @JoinColumn({ name: 'organization_uuid', referencedColumnName: 'organization_uuid' })
  @ApiProperty({ required: false })
  organization?: Organization

  @Column({ type: 'decimal', nullable: true })
  @ApiProperty({ required: false })
  sum?: number
}
