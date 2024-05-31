import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Currency } from 'src/modules/currency/entities/currency.entity'
import { Organization } from 'src/modules/organization/entities/organization.entity'
import { PurchaseStep } from 'src/modules/purchase-step/entities/purchase-step.entity'
import { PurchaseType } from 'src/modules/purchase-type/entities/purchase-type.entity'
import { User } from 'src/modules/user/entities/user.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity({ name: 'Purchases' })
export class Purchase extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  purchase_uuid: string

  @Column()
  @ApiProperty()
  purchase_name: string

  @Column()
  @ApiProperty()
  purchase_type_id: number

  @ManyToOne(() => PurchaseType, (type) => type.purchases)
  @JoinColumn({ name: 'purchase_type_id', referencedColumnName: 'purchase_type_id' })
  @ApiProperty()
  purchase_type: PurchaseType

  @Column()
  @ApiProperty()
  initiator_uuid: string

  @ManyToOne(() => User, (user) => user.purchases)
  @JoinColumn({ name: 'initiator_uuid', referencedColumnName: 'user_uuid' })
  @ApiProperty()
  initiator: User

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  executor_uuid?: string

  @ManyToOne(() => Organization, (organization) => organization.purchases)
  @JoinColumn({ name: 'executor_uuid', referencedColumnName: 'organization_uuid' })
  @ApiProperty({ required: false })
  executor?: Organization

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  purchase_identification_code?: string

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  contract_identification_code?: string

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  start_date?: Date

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  end_date?: Date

  @Column({ type: 'decimal', nullable: true })
  @ApiProperty({ required: false })
  start_max_price?: number

  @Column({ type: 'decimal', nullable: true })
  @ApiProperty({ required: false })
  end_price?: number

  @Column()
  @ApiProperty()
  currency_code: string

  @ManyToOne(() => Currency, (currency) => currency.purchases)
  @JoinColumn({ name: 'currency_code', referencedColumnName: 'currency_code' })
  @ApiProperty()
  currency: Currency

  @Column()
  @ApiProperty()
  purchase_step_id: string

  @ManyToOne(() => PurchaseStep, (step) => step.purchases)
  @JoinColumn({ name: 'purchase_step_id', referencedColumnName: 'purchase_step_id' })
  @ApiProperty()
  purchase_step: PurchaseStep

  @Column()
  @ApiProperty()
  delivery_address: string

  @Column()
  @ApiProperty()
  is_organization_fund: boolean

  @Column({ type: 'decimal' })
  @ApiProperty()
  application_enforcement: number

  @Column()
  @ApiProperty()
  is_unilateral_refusal: boolean

  @Column({ type: 'decimal', nullable: true })
  @ApiProperty({ required: false })
  contract_enforcement: number

  @Column()
  @ApiProperty()
  quality_guarantee_period: number // months

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  manufacturer_guarantee: number // months

  @Column({ type: 'decimal', nullable: true })
  @ApiProperty({ required: false })
  warranty_obligations_enforcement: number

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ required: false })
  additional_info: string
}
