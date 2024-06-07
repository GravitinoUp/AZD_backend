import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm'

export class CreateNewOKPD1717606277765 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.query('DROP TABLE "OKPD2" CASCADE')
    await queryRunner.manager.query('TRUNCATE "Plans" CASCADE')

    await queryRunner.changeColumn(
      'Plans',
      'okpd_code',
      new TableColumn({ name: 'okpd_uuid', type: 'uuid' }),
    )

    await queryRunner.changeColumn(
      'Plans',
      'okei_code',
      new TableColumn({ name: 'okei_uuid', type: 'uuid' }),
    )

    await queryRunner.createTable(
      new Table({
        name: 'OKPD2',
        columns: [
          {
            name: 'okpd_uuid',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'okpd_code',
            type: 'varchar',
          },
          {
            name: 'okpd_name',
            type: 'varchar',
          },
          {
            name: 'okpd_data_json',
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
      'Plans',
      new TableForeignKey({
        columnNames: ['okpd_uuid'],
        referencedColumnNames: ['okpd_uuid'],
        referencedTableName: 'OKPD2',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('OKPD2')
  }
}
