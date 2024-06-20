import { Injectable } from '@nestjs/common'
import { CommercialOffer } from './entities/commercial-offer.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class CommercialOfferService {
  constructor(
    @InjectRepository(CommercialOffer)
    private commercialOfferRepository: Repository<CommercialOffer>,
  ) {}
}
