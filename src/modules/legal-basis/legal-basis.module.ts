import { Module } from '@nestjs/common'
import { LegalBasisService } from './legal-basis.service'
import { LegalBasisResolver } from './legal-basis.resolver'

@Module({
  providers: [LegalBasisService, LegalBasisResolver],
  exports: [LegalBasisService],
})
export class LegalBasisModule {}
