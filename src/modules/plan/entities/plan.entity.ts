import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Organization } from 'src/modules/organization/entities/organization.entity'
import { PlanWay } from 'src/modules/plan-way/entities/plan-way.entity'
import { User } from 'src/modules/user/entities/user.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity({ name: 'Plans' })
export class Plan extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  plan_uuid: string

  @Column()
  @ApiProperty()
  user_uuid: string

  @ManyToOne(() => User, (user) => user.plans)
  @JoinColumn({ name: 'user_uuid', referencedColumnName: 'user_uuid' })
  @ApiProperty()
  user: User

  @Column({ nullable: true })
  @ApiProperty({ required: false, description: 'Номер предложения на закупку (Электронный бюджет)' })
  purchase_offer_number?: string

  @Column()
  @ApiProperty({ description: 'Код ОКПД2' })
  okpd_uuid: string // TODO UUID

  @Column()
  @ApiProperty({ description: 'Наименование объекта закупки' })
  object_name: string

  @Column()
  @ApiProperty({ description: 'Код по ОКЕИ' })
  okei_uuid: string // TODO UUID

  @Column()
  @ApiProperty({ description: 'Наименование результата закупки товара, работ, услуги' })
  result_name: string

  @Column()
  @ApiProperty({
    description:
      'Дата / Сведения о НПА, утвержденных в соответствии со ст. 19 Федерального закона от 05.04.2013 № 44-ФЗ',
  })
  npa_date: Date

  @Column()
  @ApiProperty({
    description:
      'Номер, Вид документа / Сведения о НПА, утвержденных в соответствии со ст. 19 Федерального закона от 05.04.2013 № 44-ФЗ',
  })
  npa_number: string

  @Column({ default: 0 })
  @ApiProperty({ description: 'Плановое значение. Кол-во. Текущий год.' })
  current_year_plan_count: number

  @Column({ type: 'decimal', default: 0 })
  @ApiProperty({ description: 'Плановое значение. Средняя цена. Текущий год.' })
  current_year_plan_avg_price: number

  @Column({ default: 0 })
  @ApiProperty({ description: 'Плановое значение. Кол-во. Следующий год.' })
  first_year_plan_count: number

  @Column({ type: 'decimal', default: 0 })
  @ApiProperty({ description: 'Плановое значение. Средняя цена. Следующий год.' })
  first_year_plan_avg_price: number

  @Column({ default: 0 })
  @ApiProperty({ description: 'Плановое значение. Кол-во. Второй год.' })
  second_year_plan_count: number

  @Column({ type: 'decimal', default: 0 })
  @ApiProperty({ description: 'Плановое значение. Средняя цена. Второй год.' })
  second_year_plan_avg_price: number

  @Column({ default: 0 })
  @ApiProperty({ description: 'Плановое значение. Кол-во. Последующие года.' })
  next_years_plan_count: number

  @Column({ type: 'decimal', default: 0 })
  @ApiProperty({ description: 'Плановое значение. Средняя цена. Последующие года.' })
  next_years_plan_avg_price: number

  @Column({ type: 'decimal', default: 0 })
  @ApiProperty({ description: 'Объем финансового обеспечения. Текущий год.' })
  current_year_limit: number

  @Column({ type: 'decimal', default: 0 })
  @ApiProperty({ description: 'Объем финансового обеспечения. Следующий год.' })
  first_year_limit: number

  @Column({ type: 'decimal', default: 0 })
  @ApiProperty({ description: 'Объем финансового обеспечения. Второй год.' })
  second_year_limit: number

  @Column({ type: 'decimal', default: 0 })
  @ApiProperty({ description: 'Объем финансового обеспечения. Последующие года.' })
  next_years_limit: number

  @Column({ type: 'decimal', default: 0 })
  @ApiProperty({ description: 'Начальная (максимальная) цена контракта' })
  start_max_price: number

  @Column()
  @ApiProperty({ description: 'Информация о проведении обязательного общественного обсуждения закупки' })
  public_purchase_discussion: boolean

  @Column({ nullable: true })
  @ApiProperty({
    required: false,
    description: 'Наименование уполномоченного органа (учреждения)',
  })
  authorized_institution?: string

  @Column({ nullable: true })
  @ApiProperty({
    required: false,
    description: 'Наименование организатора проведения совместного конкурса или аукциона',
  })
  organizer_name?: string

  @Column()
  @ApiProperty({ description: 'Месяц размещения извещения или заключения контракта у ед. поставщика' })
  placement_month: string

  @Column()
  @ApiProperty({ description: 'ID Способа' })
  way_id: number

  @ManyToOne(() => PlanWay, (way) => way.plans)
  @JoinColumn({ name: 'way_id', referencedColumnName: 'way_id' })
  @ApiProperty({ description: 'Способ' })
  way: PlanWay

  @Column()
  @ApiProperty({ description: 'Осуществление закупки у СМП и СОНО' })
  small_business: boolean

  @Column()
  @ApiProperty({ description: 'Инициатор закупки' })
  initiator: string

  @Column()
  @ApiProperty({ description: 'UUID Филиала' })
  branch_uuid: string

  @ManyToOne(() => Organization, (organization) => organization.plans)
  @JoinColumn({ name: 'branch_uuid', referencedColumnName: 'organization_uuid' })
  @ApiProperty({ description: 'Филиал' })
  branch: Organization

  @Column({ type: 'decimal', nullable: true })
  @ApiProperty({
    required: false,
    description:
      'Заключено государственных контрактов, договоров, закуплено продукции на сумму, не превышающую шестисот тысяч рублей. В стоимостном выражении (руб.)',
  })
  price_value?: number

  @Column({ type: 'decimal', nullable: true })
  @ApiProperty({
    required: false,
    description:
      'Заключено государственных контрактов, договоров, закуплено продукции на сумму, не превышающую шестисот тысяч рублей. Экономия по результатам размещения заказа (руб.)',
  })
  savings?: number

  @Column({ nullable: true })
  @ApiProperty({ required: false, description: '№ Контракта' })
  contract_number?: string

  @Column({ nullable: true })
  @ApiProperty({ required: false, description: 'Дата Контракта' })
  contract_date?: Date

  @Column({ nullable: true })
  @ApiProperty({ required: false, description: 'Контрагент' })
  contragent?: string

  @Column()
  @ApiProperty({ description: 'Письмо согласования/ письмо уведомления (номер и дата)' })
  approval_letter: string
}
