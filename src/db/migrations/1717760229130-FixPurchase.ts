import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class FixPurchase1717760229130 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'Purchases',
      'warranty_obligations_enforcement',
      new TableColumn({ name: 'warranty_obligations_enforcement', type: 'decimal' }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'Purchases',
      'warranty_obligations_enforcement',
      new TableColumn({ name: 'warranty_obligations_enforcement', type: 'bool' }),
    )
  }
}
