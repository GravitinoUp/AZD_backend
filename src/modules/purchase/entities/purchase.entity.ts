import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Currency } from 'src/modules/currency/entities/currency.entity'
import { Organization } from 'src/modules/organization/entities/organization.entity'
import { PlanPosition } from 'src/modules/plan-position/entities/plan-position.entity'
import { PurchaseEvent } from 'src/modules/purchase-event/entities/purchase-event.entity'
import { PurchaseStep } from 'src/modules/purchase-step/entities/purchase-step.entity'
import { PurchaseType } from 'src/modules/purchase-type/entities/purchase-type.entity'
import { TechnicalTask } from 'src/modules/technical-task/entities/technical_task.entity'
import { User } from 'src/modules/user/entities/user.entity'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm'
import { PurchaseProduct } from './purchase-products.entity'
import { Document } from 'src/modules/document/entities/document.entity'
import { CommercialOffer } from 'src/modules/commercial-offer/entities/commercial-offer.entity'
import { AppStrings } from 'src/common/constants/strings'

@Entity({ name: 'Purchases' })
export class Purchase extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  purchase_uuid: string

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  purchase_name?: string

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  purchase_type_id?: number

  @ManyToOne(() => PurchaseType, (type) => type.purchases)
  @JoinColumn({ name: 'purchase_type_id', referencedColumnName: 'purchase_type_id' })
  @ApiProperty({ required: false })
  purchase_type?: PurchaseType

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  initiator_uuid?: string

  @ManyToOne(() => User, (user) => user.purchases)
  @JoinColumn({ name: 'initiator_uuid', referencedColumnName: 'user_uuid' })
  @ApiProperty({ required: false })
  initiator?: User

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
  end_application_date?: Date

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  executor_date?: Date

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  end_date?: Date

  @Column({ type: 'decimal', nullable: true })
  @ApiProperty({ required: false })
  start_max_price?: number

  @Column({ type: 'decimal', nullable: true })
  @ApiProperty({ required: false })
  end_price?: number

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  currency_code?: string

  @ManyToOne(() => Currency, (currency) => currency.purchases)
  @JoinColumn({ name: 'currency_code', referencedColumnName: 'currency_code' })
  @ApiProperty({ required: false })
  currency?: Currency

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  purchase_step_id?: number

  @ManyToOne(() => PurchaseStep, (step) => step.purchases)
  @JoinColumn({ name: 'purchase_step_id', referencedColumnName: 'purchase_step_id' })
  @ApiProperty({ required: false })
  purchase_step?: PurchaseStep

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  delivery_address?: string

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  is_organization_fund?: boolean

  @Column({ type: 'decimal', nullable: true })
  @ApiProperty({ required: false })
  application_enforcement?: number

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  is_unilateral_refusal?: boolean

  @Column({ type: 'decimal', nullable: true })
  @ApiProperty({ required: false })
  contract_enforcement?: number

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  quality_guarantee_period?: number // months

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  manufacturer_guarantee?: number // months

  @Column({ type: 'decimal', nullable: true })
  @ApiProperty({ required: false })
  warranty_obligations_enforcement?: number

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ required: false })
  additional_info?: string

  @Column({ type: 'uuid', array: true })
  @ApiProperty({ description: AppStrings.PROPERTY_VALUES })
  property_values: string[]

  @OneToMany(() => PurchaseEvent, (purchaseEvent) => purchaseEvent.purchase, { cascade: true })
  purchase_events: PurchaseEvent[]

  @OneToMany(() => TechnicalTask, (task) => task.purchase, { cascade: true })
  technical_tasks: TechnicalTask[]

  @OneToMany(() => PlanPosition, (plan) => plan.purchase, { cascade: true })
  plan_positions: PlanPosition[]

  @OneToMany(() => PurchaseProduct, (purchaseProduct) => purchaseProduct.purchase, {
    cascade: true,
  })
  purchase_products: PurchaseProduct[]

  @OneToMany(() => Document, (document) => document.purchase, {
    cascade: true,
  })
  documents: Document[]

  @OneToMany(() => CommercialOffer, (offer) => offer.purchase, {
    cascade: true,
  })
  commercial_offers: CommercialOffer[]
}
