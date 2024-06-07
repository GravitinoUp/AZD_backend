import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm'

export class UpdateLimits1717745976268 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.query('TRUNCATE "Limits" CASCADE')

    await queryRunner.createTable(
      new Table({
        name: 'LimitStatuses',
        columns: [
          {
            name: 'limit_status_id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'limit_status_name',
            type: 'varchar',
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

    await queryRunner.addColumn('Limits', new TableColumn({ name: 'limit_status_id', type: 'int' }))
    await queryRunner.addColumn(
      'Limits',
      new TableColumn({ name: 'limit_version', type: 'int', default: 1 }),
    )

    await queryRunner.createForeignKey(
      'Limits',
      new TableForeignKey({
        columnNames: ['limit_status_id'],
        referencedColumnNames: ['limit_status_id'],
        referencedTableName: 'LimitStatuses',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('Limits', 'limit_status_id')
    await queryRunner.dropColumn('Limits', 'limit_version')

    await queryRunner.dropTable('LimitStatuses')
  }
}
