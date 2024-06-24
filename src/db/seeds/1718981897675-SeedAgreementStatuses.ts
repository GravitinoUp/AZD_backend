import { EntitiesEnum } from 'src/common/constants/constants'
import { AgreementStatus } from 'src/modules/agreement-status/entities/agreement-status.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedAgreementStatuses1718981897675 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(AgreementStatus, [
      {
        agreement_status_id: 1,
        agreement_status_name: 'Создано',
        entity_id: EntitiesEnum.PLANS,
      },
      {
        agreement_status_id: 2,
        agreement_status_name: 'На согласовании',
        entity_id: EntitiesEnum.PLANS,
      },
      {
        agreement_status_id: 3,
        agreement_status_name: 'Согласовано',
        entity_id: EntitiesEnum.PLANS,
      },
      {
        agreement_status_id: 4,
        agreement_status_name: 'Не согласовано',
        entity_id: EntitiesEnum.PLANS,
      },
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('AgreementStatuses')
  }
}
