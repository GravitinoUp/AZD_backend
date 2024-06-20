import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CommercialOffer } from './entities/commercial-offer.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import {
  BulkUpdateCommercialOfferDto,
  CreateCommercialOfferDto,
  SendCommercialOfferDto,
  UpdateCommercialOfferDto,
} from './dto'
import { StatusCommercialOfferResponse, StatusUpdateCommercialOfferResponse } from './response'
import { I18nService } from 'nestjs-i18n'
import { MailService } from '../mail/mail.service'
import { Organization } from '../organization/entities/organization.entity'
import { PurchaseService } from '../purchase/purchase.service'

@Injectable()
export class CommercialOfferService {
  constructor(
    @InjectRepository(CommercialOffer)
    private commercialOfferRepository: Repository<CommercialOffer>,
    private readonly mailService: MailService,
    private readonly purchaseService: PurchaseService,
    private readonly i18n: I18nService,
    private dataSource: DataSource,
  ) {}

  async create(commercialOffer: CreateCommercialOfferDto): Promise<StatusCommercialOfferResponse> {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      for (const organization_uuid of commercialOffer.organizations) {
        const newCommercialOffer = await queryRunner.manager
          .getRepository(CommercialOffer)
          .createQueryBuilder()
          .insert()
          .values({
            purchase_uuid: commercialOffer.purchase_uuid,
            organization_uuid: organization_uuid,
          })
          .returning('*')
          .execute()

        if (newCommercialOffer?.identifiers?.length != 0) {
          const organization = await queryRunner.manager
            .getRepository(Organization)
            .createQueryBuilder('organization')
            .select(['organization.email'])
            .where({ organization_uuid })
            .getOne()

          if (organization?.email) {
            const commercialOfferMail = new SendCommercialOfferDto()
            commercialOfferMail.email = organization.email
            commercialOfferMail.purchase_name = commercialOffer.purchase_uuid

            await this.mailService.sendCommercialOfferMessage(commercialOfferMail)
          }
        }
      }

      await queryRunner.commitTransaction()
      return { status: true }
    } catch (error) {
      console.log(error)
      await queryRunner.rollbackTransaction()
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    } finally {
      await queryRunner.release()
    }
  }

  async isExists(commercial_offer_uuid: string): Promise<boolean> {
    try {
      const isCommercialOfferExists = await this.commercialOfferRepository
        .createQueryBuilder()
        .select()
        .where({ commercial_offer_uuid })
        .getExists()

      return isCommercialOfferExists
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(commercialOffer: UpdateCommercialOfferDto): Promise<StatusCommercialOfferResponse> {
    try {
      const updateCommercialOffer = await this.commercialOfferRepository
        .createQueryBuilder()
        .update()
        .where({ commercial_offer_uuid: commercialOffer.commercial_offer_uuid })
        .set({
          ...commercialOffer,
        })
        .execute()

      return { status: updateCommercialOffer.affected !== 0 }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async bulkUpdate(
    commercialOffers: BulkUpdateCommercialOfferDto,
    formula: 'avg' | 'min',
  ): Promise<StatusUpdateCommercialOfferResponse> {
    try {
      const prices = []
      for (const offer of commercialOffers.offers) {
        await this.commercialOfferRepository
          .createQueryBuilder()
          .update()
          .where({ commercial_offer_uuid: offer.commercial_offer_uuid })
          .set({
            ...offer,
          })
          .execute()

        prices.push(offer.sum)
      }

      const startMaxPrice = await this.purchaseService.getStartMaxPrice(prices, formula)

      return { status: true, start_max_price: startMaxPrice }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
