import { PurchaseStep } from 'src/modules/purchase-step/entities/purchase-step.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedPurchaseSteps1717403144134 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(PurchaseStep, [
      {
        purchase_step_id: 1,
        purchase_step_name: 'Подача заявок',
      },
      {
        purchase_step_id: 2,
        purchase_step_name: 'Работа комиссии',
      },
      {
        purchase_step_id: 3,
        purchase_step_name: 'Закупка завершена',
      },
      {
        purchase_step_id: 4,
        purchase_step_name: 'Закупка отменена',
      },
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('PurchaseSteps')
  }
}
