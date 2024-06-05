import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm'

export class CreateKBK1717573471265 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.query('TRUNCATE "Limits" CASCADE')

    await queryRunner.createTable(
      new Table({
        name: 'KBKValues',
        columns: [
          {
            name: 'kbk_value_uuid',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'kbk_type',
            type: 'varchar',
          },
          {
            name: 'kbk_value',
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

    await queryRunner.createTable(
      new Table({
        name: 'KBK',
        columns: [
          {
            name: 'kbk_uuid',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'kbk_name',
            type: 'varchar',
          },
          {
            name: 'kbk_section_uuid',
            type: 'uuid',
          },
          {
            name: 'kbk_subsection_uuid',
            type: 'uuid',
          },
          {
            name: 'kbk_target_article_uuid',
            type: 'uuid',
          },
          {
            name: 'kbk_expenses_type_uuid',
            type: 'uuid',
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
      'KBK',
      new TableForeignKey({
        columnNames: ['kbk_section_uuid'],
        referencedColumnNames: ['kbk_value_uuid'],
        referencedTableName: 'KBKValues',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      'KBK',
      new TableForeignKey({
        columnNames: ['kbk_subsection_uuid'],
        referencedColumnNames: ['kbk_value_uuid'],
        referencedTableName: 'KBKValues',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      'KBK',
      new TableForeignKey({
        columnNames: ['kbk_target_article_uuid'],
        referencedColumnNames: ['kbk_value_uuid'],
        referencedTableName: 'KBKValues',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      'KBK',
      new TableForeignKey({
        columnNames: ['kbk_expenses_type_uuid'],
        referencedColumnNames: ['kbk_value_uuid'],
        referencedTableName: 'KBKValues',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )

    await queryRunner.changeColumn(
      'Limits',
      'kbk_code',
      new TableColumn({
        name: 'kbk_uuid',
        type: 'uuid',
      }),
    )

    await queryRunner.createForeignKey(
      'Limits',
      new TableForeignKey({
        columnNames: ['kbk_uuid'],
        referencedColumnNames: ['kbk_uuid'],
        referencedTableName: 'KBK',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )

    await queryRunner.createTable(
      new Table({
        name: 'Kosgu',
        columns: [
          {
            name: 'kosgu_uuid',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'kosgu_code',
            type: 'varchar',
          },
          {
            name: 'kosgu_name',
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

    await queryRunner.changeColumn(
      'Limits',
      'kosgu',
      new TableColumn({
        name: 'kosgu_uuid',
        type: 'uuid',
      }),
    )

    await queryRunner.createForeignKey(
      'Limits',
      new TableForeignKey({
        columnNames: ['kosgu_uuid'],
        referencedColumnNames: ['kosgu_uuid'],
        referencedTableName: 'Kosgu',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Kosgu')
    await queryRunner.dropTable('KBK')
    await queryRunner.dropTable('KBKValues')

    await queryRunner.changeColumn(
      'Limits',
      'kbk_uuid',
      new TableColumn({
        name: 'kbk_code',
        type: 'varchar',
      }),
    )

    await queryRunner.changeColumn(
      'Limits',
      'kosgu_uuid',
      new TableColumn({
        name: 'kosgu',
        type: 'varchar',
      }),
    )
  }
}
