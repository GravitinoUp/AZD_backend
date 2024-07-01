import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { I18nContext, I18nService } from 'nestjs-i18n'
import { Repository, DataSource } from 'typeorm'
import { CreatePurchaseDto, UpdatePurchaseDto } from '../purchase/dto'
import { Purchase } from '../purchase/entities/purchase.entity'
import { ArrayPurchaseResponse, StatusPurchaseResponse } from '../purchase/response'
import { DefaultPagination, PurchaseStepsEnum } from 'src/common/constants/constants'
import { formatFilter } from 'src/utils/format-filter'
import { PurchaseFilter } from './filter'
import { PurchaseEvent } from '../purchase-event/entities/purchase-event.entity'
import { CreatePurchaseEventDto } from '../purchase-event/dto'
import { RuleService } from '../rule/rule.service'
import checkRule from 'src/utils/check-rules'
import { PropertiesService } from '../properties/properties.service'

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>,
    private readonly propertyService: PropertiesService,
    private readonly ruleService: RuleService,
    private readonly dataSource: DataSource,
    private readonly i18n: I18nService,
  ) {}

  async create(
    purchase: CreatePurchaseDto,
    initiatorUuid: string,
  ): Promise<StatusPurchaseResponse> {
    try {
      const rules = await this.ruleService.findAll({})
      for (const rule of rules.data) {
        const fieldOnValue = purchase[rule.rule_field_on]
        const fieldForValue = purchase[rule.rule_field_for]

        const check = await checkRule(
          Number(fieldOnValue),
          rule.rule_on_operator,
          Number(rule.rule_on_condition_value),
          fieldForValue ? Number(fieldForValue) : null,
          rule.rule_for_operator,
          rule.rule_for_condition_value ? Number(rule.rule_for_condition_value) : null,
        )

        if (!check) {
          throw new BadRequestException(`Нарушено ограничение: ${rule.rule_name}`)
        }
      }

      const newPurchase = await this.purchaseRepository
        .createQueryBuilder()
        .insert()
        .values({
          ...purchase,
          initiator_uuid: initiatorUuid,
          purchase_step_id: PurchaseStepsEnum.APPLICATIONS,
        })
        .returning('*')
        .execute()

      return { status: true, data: newPurchase.raw[0] }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll(
    purchaseFilter: PurchaseFilter,
    includeProperties: boolean = true,
  ): Promise<ArrayPurchaseResponse> {
    try {
      const count = purchaseFilter?.offset?.count ?? DefaultPagination.COUNT
      const page = purchaseFilter?.offset?.page ?? DefaultPagination.PAGE
      const filters = formatFilter(purchaseFilter?.filter ?? {})

      const purchases = await this.purchaseRepository.findAndCount({
        relations: {
          initiator: { person: true },
          executor: true,
          currency: true,
          purchase_step: true,
          purchase_products: { product: true },
          commercial_offers: true,
          purchase_type: true,
        },
        where: filters,
        order: purchaseFilter.sorts,
        skip: count * (page - 1),
        take: count,
      })

      if (includeProperties == true) {
        for (const purchase of purchases[0]) {
          if (purchase.property_values.length > 0) {
            const properties = await this.propertyService.findByIds(purchase.property_values)
            purchase['properties'] = properties
          }
        }
      }

      return { count: purchases[1], data: purchases[0] }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async isExists(purchase_uuid: string): Promise<boolean> {
    try {
      const isExists = await this.purchaseRepository
        .createQueryBuilder()
        .select()
        .where({ purchase_uuid })
        .getExists()

      return isExists
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(purchase: UpdatePurchaseDto, user_uuid: string): Promise<StatusPurchaseResponse> {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const oldPurchase = await queryRunner.manager
        .getRepository(Purchase)
        .createQueryBuilder('purchase')
        .useTransaction(true)
        .select(Object.keys(purchase).map((key) => `purchase.${key}`))
        .where({ purchase_uuid: purchase.purchase_uuid })
        .getOne()

      for (const key of Object.keys(purchase)) {
        if (purchase[key] != oldPurchase[key]) {
          const event = new CreatePurchaseEventDto()
          event.purchase_event_name = this.i18n.t(`fields.update.${key}`, {
            lang: I18nContext.current().lang,
          }) // TODO FIELDS LOCALE
          event.old_value = oldPurchase[key]
          event.new_value = purchase[key]
          event.purchase_uuid = purchase.purchase_uuid
          event.user_uuid = user_uuid

          await queryRunner.manager
            .getRepository(PurchaseEvent)
            .createQueryBuilder()
            .useTransaction(true)
            .insert()
            .values({
              ...event,
            })
            .execute()
        }
      }

      const rules = await this.ruleService.findAll({})

      const updatePurchase = await queryRunner.manager
        .getRepository(Purchase)
        .createQueryBuilder()
        .useTransaction(true)
        .update()
        .where({ purchase_uuid: purchase.purchase_uuid })
        .set({
          ...purchase,
        })
        .returning('*')
        .execute()

      for (const rule of rules.data) {
        const fieldOnValue = updatePurchase.raw[0][rule.rule_field_on]
        const fieldForValue = updatePurchase.raw[0][rule.rule_field_for]

        const check = await checkRule(
          Number(fieldOnValue),
          rule.rule_on_operator,
          Number(rule.rule_on_condition_value),
          fieldForValue ? Number(fieldForValue) : null,
          rule.rule_for_operator,
          rule.rule_for_condition_value ? Number(rule.rule_for_condition_value) : null,
        )

        if (!check) {
          throw new BadRequestException(`Нарушено ограничение: ${rule.rule_name}`)
        }
      }

      await queryRunner.commitTransaction()
      return { status: updatePurchase.affected !== 0 }
    } catch (error) {
      console.log(error)

      await queryRunner.rollbackTransaction()
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    } finally {
      await queryRunner.release()
    }
  }

  async delete(purchase_uuid: string): Promise<StatusPurchaseResponse> {
    try {
      const deletePurchase = await this.purchaseRepository
        .createQueryBuilder()
        .delete()
        .where({ purchase_uuid })
        .execute()

      return { status: deletePurchase.affected !== 0 }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getStartMaxPrice(prices: number[], formula: string): Promise<number> {
    try {
      if (formula == 'min') {
        const startMaxPrice = Math.min(...prices)
        return startMaxPrice
      } else if (formula == 'avg') {
        const startMaxPrice = prices.reduce((a, b) => Number(a) + Number(b)) / prices.length
        return startMaxPrice
      } else {
        throw new BadRequestException(
          this.i18n.t('errors.formula_not_found', { lang: I18nContext.current().lang }),
        )
      }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
