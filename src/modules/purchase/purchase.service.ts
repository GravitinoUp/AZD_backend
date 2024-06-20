import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { I18nService } from 'nestjs-i18n'
import { Repository, DataSource } from 'typeorm'
import { CreatePurchaseDto, UpdatePurchaseDto } from '../purchase/dto'
import { Purchase } from '../purchase/entities/purchase.entity'
import { ArrayPurchaseResponse, StatusPurchaseResponse } from '../purchase/response'
import { DefaultPagination, PurchaseStepsEnum } from 'src/common/constants/constants'
import { formatFilter } from 'src/utils/format-filter'
import { PurchaseFilter } from './filter'
import { PurchaseEvent } from '../purchase-event/entities/purchase-event.entity'
import { CreatePurchaseEventDto } from '../purchase-event/dto'

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>,
    private readonly dataSource: DataSource,
    private readonly i18n: I18nService,
  ) {}

  async create(
    purchase: CreatePurchaseDto,
    initiatorUuid: string,
  ): Promise<StatusPurchaseResponse> {
    try {
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

  async findAll(purchaseFilter: PurchaseFilter): Promise<ArrayPurchaseResponse> {
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
        },
        where: filters,
        order: purchaseFilter.sorts,
        skip: count * (page - 1),
        take: count,
      })

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
          event.purchase_event_name = this.i18n.t(`fields.update.${key}`) // TODO FIELDS LOCALE
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

      const updatePurchase = await queryRunner.manager
        .getRepository(Purchase)
        .createQueryBuilder()
        .useTransaction(true)
        .update()
        .where({ purchase_uuid: purchase.purchase_uuid })
        .set({
          ...purchase,
        })
        .execute()

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
        throw new BadRequestException(this.i18n.t('errors.formula_not_found'))
      }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
