import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class UpdatePurchases1717579398825 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'Purchases',
      new TableColumn({ name: 'end_application_date', type: 'date', isNullable: true }),
    )

    await queryRunner.addColumn('Purchases', new TableColumn({ name: 'executor_date', type: 'date', isNullable: true }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('Purchases', ['end_application_date', 'executor_date'])
  }
}
