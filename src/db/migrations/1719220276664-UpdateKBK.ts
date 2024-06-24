import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm'
import { SeedKBK1718979553834 } from '../seeds/1718979553834-SeedKBK'
import { SeedLimits1718365222304 } from '../seeds/1718365222304-SeedLimits'
import { KBKType } from 'src/modules/kbk/entities/kbk-type.entity'

export class UpdateKBK1719220276664 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const revertSeeds = new SeedKBK1718979553834()
    await revertSeeds.down(queryRunner)

    await queryRunner.addColumn(
      'KBK',
      new TableColumn({
        name: 'kbk_subsection_uuid',
        type: 'uuid',
      }),
    )

    await queryRunner.createForeignKey(
      'KBK',
      new TableForeignKey({
        name: 'FK_kbk_subsection_uuid',
        columnNames: ['kbk_subsection_uuid'],
        referencedColumnNames: ['kbk_value_uuid'],
        referencedTableName: 'KBKValues',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )

    await queryRunner.changeColumn(
      'KBKValues',
      'kbk_type',
      new TableColumn({ name: 'kbk_type_id', type: 'int' }),
    )

    await queryRunner.createTable(
      new Table({
        name: 'KBKTypes',
        columns: [
          {
            name: 'kbk_type_id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'kbk_type_name',
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

    await queryRunner.manager.insert(KBKType, [
      {
        kbk_type_id: 1,
        kbk_type_name: 'Раздел',
      },
      {
        kbk_type_id: 2,
        kbk_type_name: 'Подраздел',
      },
      {
        kbk_type_id: 3,
        kbk_type_name: 'Целевая статья',
      },
      {
        kbk_type_id: 4,
        kbk_type_name: 'Вид расходов',
      },
    ])

    await queryRunner.createForeignKey(
      'KBKValues',
      new TableForeignKey({
        name: 'FK_kbk_type_id',
        columnNames: ['kbk_type_id'],
        referencedColumnNames: ['kbk_type_id'],
        referencedTableName: 'KBKTypes',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )

    const limitSeeds = new SeedLimits1718365222304()
    await limitSeeds.up(queryRunner)
    const kbkSeeds = new SeedKBK1718979553834()
    await kbkSeeds.up(queryRunner)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('KBKValues', 'FK_kbk_type_id')
    await queryRunner.changeColumn(
      'KBKValues',
      'kbk_type_id',
      new TableColumn({ name: 'kbk_type', type: 'varchar' }),
    )
    await queryRunner.dropTable('KBKTypes')
    await queryRunner.dropColumn('KBK', 'kbk_subsection_uuid')
  }
}
