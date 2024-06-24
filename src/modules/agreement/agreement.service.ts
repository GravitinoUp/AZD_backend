import { Injectable } from '@nestjs/common'
import { Agreement } from './entities/agreement-status.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateAgreementsDto } from './dto'
import { RoleAgreement } from '../role-agreement/entities/agreement-status.entity'

@Injectable()
export class AgreementService {
  constructor(
    @InjectRepository(Agreement)
    private agreementRepository: Repository<Agreement>,
    @InjectRepository(RoleAgreement)
    private roleAgreementRepository: Repository<RoleAgreement>,
  ) {}

  async create(agreement: CreateAgreementsDto) {
    try {
      const roleAgreements = await this.roleAgreementRepository
        .createQueryBuilder()
        .select()
        .where({ entity_id: agreement.entity_id })
        .getMany()
      for (const object of roleAgreements) {
        await this.agreementRepository
          .createQueryBuilder()
          .insert()
          .values({
            role_agreement_uuid: object.role_agreement_uuid,
            agreement_status_id: AgreementStatusesEnum.
          })
          .returning('*')
          .execute()
      }

      return { status: true, data: newRoleAgreement.raw[0] }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
