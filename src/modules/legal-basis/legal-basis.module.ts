import { Module } from '@nestjs/common'
import { LegalBasisService } from './legal-basis.service'
import { LegalBasisController } from './legal-basis.controller'

@Module({
  controllers: [LegalBasisController],
  providers: [LegalBasisService],
  exports: [LegalBasisService],
})
export class LegalBasisModule {}
