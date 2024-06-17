import { Okei } from 'src/modules/okei/entities/okei.entity'
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateOKEI1718627073168 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'OKEI',
        columns: [
          {
            name: 'okei_uuid',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'okei_code',
            type: 'varchar',
          },
          {
            name: 'okei_full_name',
            type: 'text',
          },
          {
            name: 'okei_short_name',
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

    await queryRunner.manager.insert(Okei, [
      {
        okei_uuid: 'df33e1fe-664d-4bd1-bf14-12e8cf99e5ac',
        okei_code: '354',
        okei_full_name: 'Секунда',
        okei_short_name: 'с',
      },
    ])

    await queryRunner.createForeignKey(
      'PlanPositions',
      new TableForeignKey({
        name: 'FK_okei_uuid',
        columnNames: ['okei_uuid'],
        referencedColumnNames: ['okei_uuid'],
        referencedTableName: 'OKEI',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('PlanPositions', 'FK_okei_uuid')
    await queryRunner.dropTable('OKEI')
  }
}
