import { Controller } from '@nestjs/common';
import { LegalBasisService } from './legal-basis.service';

@Controller('legal-basis')
export class LegalBasisController {
  constructor(private readonly legalBasisService: LegalBasisService) {}
}
