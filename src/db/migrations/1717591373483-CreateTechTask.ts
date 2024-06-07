import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateTechTask1717591373483 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'TechnicalTasks',
        columns: [
          {
            name: 'technical_task_uuid',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'purchase_uuid',
            type: 'uuid',
          },
          {
            name: 'data_json',
            type: 'json',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    )

    await queryRunner.createForeignKey(
      'TechnicalTasks',
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
    await queryRunner.dropTable('TechnicalTasks')
  }
}
