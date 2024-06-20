import { Module } from '@nestjs/common'
import { CommercialOfferService } from './commercial-offer.service'
import { CommercialOfferController } from './commercial-offer.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CommercialOffer } from './entities/commercial-offer.entity'

@Module({
  imports: [TypeOrmModule.forFeature([CommercialOffer])],
  controllers: [CommercialOfferController],
  providers: [CommercialOfferService],
  exports: [CommercialOfferService],
})
export class CommercialOfferModule {}
