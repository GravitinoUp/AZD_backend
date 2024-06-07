import { LimitStatus } from 'src/modules/limit-status/entities/limit-status.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedLimitStatuses1717747157987 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(LimitStatus, [
      {
        limit_status_id: 1,
        limit_status_name: 'Создан',
      },
      {
        limit_status_id: 2,
        limit_status_name: 'На согласовании',
      },
      {
        limit_status_id: 3,
        limit_status_name: 'Согласован',
      },
      {
        limit_status_id: 4,
        limit_status_name: 'Отклонен',
      },
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('LimitStatuses')
  }
}
