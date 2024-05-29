import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsBoolean, IsDateString, IsDecimal, IsInt, IsOptional, IsString, IsUUID } from 'class-validator'
import { OrganizationResponse } from 'src/modules/organization/response'
import { WayResponse } from 'src/modules/plan-way/response'
import { UserResponse } from 'src/modules/user/response'

export class PlanResponse {
  @IsUUID()
  @ApiProperty()
  plan_uuid: string

  @IsUUID()
  @ApiProperty()
  user_uuid: string

  @IsOptional()
  @ApiProperty()
  user?: UserResponse

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, description: 'Номер предложения на закупку (Электронный бюджет)' })
  purchase_offer_number?: string

  @IsUUID()
  @ApiProperty({ description: 'Код ОКПД2' })
  okpd_uuid: string

  @IsString()
  @ApiProperty({ description: 'Наименование объекта закупки' })
  object_name: string

  @IsUUID()
  @ApiProperty({ description: 'Код по ОКЕИ' })
  okei_uuid: string

  @IsString()
  @ApiProperty({ description: 'Наименование результата закупки товара, работ, услуги' })
  result_name: string

  @IsDateString()
  @ApiProperty({
    description:
      'Дата / Сведения о НПА, утвержденных в соответствии со ст. 19 Федерального закона от 05.04.2013 № 44-ФЗ',
  })
  npa_date: Date

  @IsString()
  @ApiProperty({
    description:
      'Номер, Вид документа / Сведения о НПА, утвержденных в соответствии со ст. 19 Федерального закона от 05.04.2013 № 44-ФЗ',
  })
  npa_number: string

  @IsInt()
  @ApiProperty({ description: 'Плановое значение. Кол-во. Текущий год.' })
  current_year_plan_count: number

  @IsDecimal()
  @ApiProperty({ description: 'Плановое значение. Средняя цена. Текущий год.' })
  current_year_plan_avg_price: number

  @IsInt()
  @ApiProperty({ description: 'Плановое значение. Кол-во. Следующий год.' })
  first_year_plan_count: number

  @IsDecimal()
  @ApiProperty({ description: 'Плановое значение. Средняя цена. Следующий год.' })
  first_year_plan_avg_price: number

  @IsInt()
  @ApiProperty({ description: 'Плановое значение. Кол-во. Второй год.' })
  second_year_plan_count: number

  @IsDecimal()
  @ApiProperty({ description: 'Плановое значение. Средняя цена. Второй год.' })
  second_year_plan_avg_price: number

  @IsInt()
  @ApiProperty({ description: 'Плановое значение. Кол-во. Последующие года.' })
  next_years_plan_count: number

  @IsDecimal()
  @ApiProperty({ description: 'Плановое значение. Средняя цена. Последующие года.' })
  next_years_plan_avg_price: number

  @IsDecimal()
  @ApiProperty({ description: 'Объем финансового обеспечения. Текущий год.' })
  current_year_limit: number

  @IsDecimal()
  @ApiProperty({ description: 'Объем финансового обеспечения. Следующий год.' })
  first_year_limit: number

  @IsDecimal()
  @ApiProperty({ description: 'Объем финансового обеспечения. Второй год.' })
  second_year_limit: number

  @IsDecimal()
  @ApiProperty({ description: 'Объем финансового обеспечения. Последующие года.' })
  next_years_limit: number

  @IsDecimal()
  @ApiProperty({ description: 'Начальная (максимальная) цена контракта' })
  start_max_price: number

  @IsBoolean()
  @ApiProperty({ description: 'Информация о проведении обязательного общественного обсуждения закупки' })
  public_purchase_discussion: boolean

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, description: 'Наименование уполномоченного органа (учреждения)' })
  authorized_institution?: string

  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'Наименование организатора проведения совместного конкурса или аукциона',
  })
  organizer_name?: string

  @IsString()
  @ApiProperty({ description: 'Месяц размещения извещения или заключения контракта у ед. поставщика' })
  placement_month: string

  @IsInt()
  @ApiProperty({ description: 'ID Способа' })
  way_id: number

  @IsOptional()
  @ApiProperty({ description: 'Способ' })
  way?: WayResponse

  @IsBoolean()
  @ApiProperty({ description: 'Осуществление закупки у СМП и СОНО' })
  small_business: boolean

  @IsString()
  @ApiProperty({ description: 'Инициатор закупки' })
  initiator: string

  @IsUUID()
  @ApiProperty({ description: 'UUID Филиала' })
  branch_uuid: string

  @IsOptional()
  @ApiProperty({ description: 'Филиал' })
  branch?: OrganizationResponse

  @IsDecimal()
  @IsOptional()
  @ApiProperty({
    required: false,
    description:
      'Заключено государственных контрактов, договоров, закуплено продукции на сумму, не превышающую шестисот тысяч рублей. В стоимостном выражении (руб.)',
  })
  price_value?: number

  @IsDecimal()
  @IsOptional()
  @ApiProperty({
    required: false,
    description:
      'Заключено государственных контрактов, договоров, закуплено продукции на сумму, не превышающую шестисот тысяч рублей. Экономия по результатам размещения заказа (руб.)',
  })
  savings?: number

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, description: '№ Контракта' })
  contract_number?: string

  @IsDateString()
  @IsOptional()
  @ApiProperty({ required: false, description: 'Дата Контракта' })
  contract_date?: Date

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, description: 'Контрагент' })
  contragent?: string

  @IsString()
  @ApiProperty({ description: 'Письмо согласования/ письмо уведомления (номер и дата)' })
  approval_letter: string
}

export class ArrayPlanResponse {
  @IsInt()
  @ApiProperty()
  count: number

  @IsArray()
  @ApiProperty({ required: false, type: PlanResponse, isArray: true })
  data: PlanResponse[]
}

export class StatusPlanResponse {
  @IsBoolean()
  @ApiProperty()
  status: boolean

  @IsOptional()
  @ApiProperty({ required: false })
  data?: PlanResponse
}
