import { Controller, UseFilters } from '@nestjs/common'
import { CommercialOfferService } from './commercial-offer.service'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'

@ApiBearerAuth()
@ApiTags('Branches')
@Controller('commercial-offer')
@UseFilters(AllExceptionsFilter)
export class CommercialOfferController {
  constructor(private readonly commercialOfferService: CommercialOfferService) {}
}
