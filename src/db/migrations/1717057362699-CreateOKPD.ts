import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateOKPD1717057362699 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'OKPD2',
        columns: [
          {
            name: 'okpd_code',
            type: 'varchar',
            isPrimary: true,
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
        columnNames: ['okpd_code'],
        referencedColumnNames: ['okpd_code'],
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
