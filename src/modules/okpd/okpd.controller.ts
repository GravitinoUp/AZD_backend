import { Controller, UseFilters } from '@nestjs/common'
import { OkpdService } from './okpd.service'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'

@ApiBearerAuth()
@ApiTags('OKPD2')
@Controller('okpd')
@UseFilters(AllExceptionsFilter)
export class OkpdController {
  constructor(private readonly okpdService: OkpdService) {}
}
