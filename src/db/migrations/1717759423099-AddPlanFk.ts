import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm'

export class AddPlanFk1717759423099 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'Plans',
      new TableForeignKey({
        columnNames: ['purchase_uuid'],
        referencedColumnNames: ['purchase_uuid'],
        referencedTableName: 'Purchases',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('Plans', 'purchase_uuid')
  }
}
