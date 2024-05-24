import { LegalBasisService } from './legal-basis.service'
import { Resolver } from '@nestjs/graphql'

@Resolver('legal-basis')
export class LegalBasisResolver {
  constructor(private readonly legalBasisService: LegalBasisService) {}
}
