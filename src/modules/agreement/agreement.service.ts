import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Agreement } from './entities/agreement.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, QueryRunner, Repository } from 'typeorm'
import { CreateAgreementsDto, UpdateAgreementDto } from './dto'
import { RoleAgreement } from '../role-agreement/entities/role-agreement.entity'
import { AgreementStatusesEnum } from 'src/common/constants/constants'
import {
  AgreementResponse,
  ArrayAgreementResponse,
  StatusAgreementResponse,
  StatusArrayAgreementResponse,
} from './response'
import { User } from '../user/entities/user.entity'
import { I18nContext, I18nService } from 'nestjs-i18n'

@Injectable()
export class AgreementService {
  constructor(
    @InjectRepository(Agreement)
    private agreementRepository: Repository<Agreement>,
    @InjectRepository(RoleAgreement)
    private roleAgreementRepository: Repository<RoleAgreement>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private dataSource: DataSource,
    private readonly i18n: I18nService,
  ) {}

  async create(
    agreement: CreateAgreementsDto,
    qRunner?: QueryRunner,
  ): Promise<StatusArrayAgreementResponse> {
    const queryRunner = qRunner ?? this.dataSource.createQueryRunner()

    if (!qRunner) {
      await queryRunner.connect()
      await queryRunner.startTransaction()
    }

    try {
      const roleAgreements = await queryRunner.manager
        .getRepository(RoleAgreement)
        .createQueryBuilder()
        .useTransaction(true)
        .select()
        .where({ entity_id: agreement.entity_id })
        .getMany()

      const agreements: AgreementResponse[] = []
      for (const object of roleAgreements) {
        const newAgreement = await queryRunner.manager
          .getRepository(Agreement)
          .createQueryBuilder()
          .useTransaction(true)
          .insert()
          .values({
            ...agreement,
            role_agreement_uuid: object.role_agreement_uuid,
            agreement_status_id: AgreementStatusesEnum.CREATED,
          })
          .returning('*')
          .execute()

        agreements.push(newAgreement.raw[0])
      }

      if (!qRunner) await queryRunner.commitTransaction()
      return { status: true, data: agreements }
    } catch (error) {
      console.log(error)

      if (!qRunner) await queryRunner.rollbackTransaction()
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    } finally {
      if (!qRunner) await queryRunner.release()
    }
  }

  async findAllByDocument(
    document_uuid: string,
    entity_id: number,
  ): Promise<ArrayAgreementResponse> {
    try {
      const agreements = await this.agreementRepository.findAndCount({
        relations: { entity: true, role_agreement: { role: true } },
        where: { document_uuid, entity_id },
      })

      return { count: agreements[1], data: agreements[0] }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async isExists(agreement_uuid: string): Promise<boolean> {
    try {
      const isAgreementExists = await this.agreementRepository
        .createQueryBuilder()
        .select()
        .where({ agreement_uuid })
        .getExists()

      return isAgreementExists
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(agreement: UpdateAgreementDto, user_uuid: string): Promise<StatusAgreementResponse> {
    try {
      const agreementData = await this.agreementRepository
        .createQueryBuilder()
        .select()
        .where({ document_uuid: agreement.document_uuid, entity_id: agreement.entity_id })
        .getOne()

      if (agreementData) {
        const user = await this.userRepository
          .createQueryBuilder('user')
          .select('user.role_id')
          .where({ user_uuid })
          .getOne()

        const roleAgreement = await this.roleAgreementRepository
          .createQueryBuilder()
          .select()
          .where({ entity_id: agreementData.entity_id, role_id: user.role_id })
          .getOne()

        if (roleAgreement) {
          if (roleAgreement.parent_role_id) {
            const parentRoleAgreement = await this.roleAgreementRepository
              .createQueryBuilder()
              .select()
              .where({ entity_id: agreementData.entity_id, role_id: roleAgreement.parent_role_id })
              .getOne()

            const parentAgreement = await this.agreementRepository
              .createQueryBuilder('agreement')
              .select('agreement.agreement_status_id')
              .where({ role_agreement_uuid: parentRoleAgreement.role_agreement_uuid })
              .getOne()

            if (parentAgreement.agreement_status_id == AgreementStatusesEnum.APPROVED) {
              // TODO статус сущности entity_id
              const updateAgreement = await this.agreementRepository
                .createQueryBuilder()
                .update()
                .where({
                  role_agreement_uuid: roleAgreement.role_agreement_uuid,
                  document_uuid: agreement.document_uuid,
                  entity_id: agreementData.entity_id,
                })
                .set({
                  agreement_status_id: agreement.agreement_status_id,
                })
                .execute()

              return { status: updateAgreement.affected !== 0 }
            } else {
              throw new ForbiddenException(
                this.i18n.t('errors.parent_agreement_change_status_forbidden', {
                  lang: I18nContext.current().lang,
                }),
              )
            }
          } else {
            const updateAgreement = await this.agreementRepository
              .createQueryBuilder()
              .update()
              .where({
                role_agreement_uuid: roleAgreement.role_agreement_uuid,
                document_uuid: agreement.document_uuid,
                entity_id: agreementData.entity_id,
              })
              .set({
                agreement_status_id: agreement.agreement_status_id,
              })
              .execute()

            return { status: updateAgreement.affected !== 0 }
          }
        } else {
          throw new ForbiddenException(
            this.i18n.t('errors.agreement_or_doc_not_found', {
              lang: I18nContext.current().lang,
            }),
          )
        }
      } else {
        throw new ForbiddenException(
          this.i18n.t('errors.agreement_or_doc_not_found', {
            lang: I18nContext.current().lang,
          }),
        )
      }
    } catch (error) {
      console.log(error)

      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
