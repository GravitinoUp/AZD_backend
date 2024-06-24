import { AgreementStatus } from 'src/modules/agreement-status/entities/agreement-status.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedAgreementStatuses1718981897675 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(AgreementStatus, [
      {
        agreement_status_id: 1,
        agreement_status_name: 'Создано',
      },
      {
        agreement_status_id: 2,
        agreement_status_name: 'На согласовании',
      },
      {
        agreement_status_id: 3,
        agreement_status_name: 'Согласовано',
      },
      {
        agreement_status_id: 4,
        agreement_status_name: 'Не согласовано',
      },
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('AgreementStatuses')
  }
}
