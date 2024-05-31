import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateLimit1717067559695 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Currencies',
        columns: [
          {
            name: 'currency_code',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'currency_name',
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
        name: 'Limits',
        columns: [
          {
            name: 'limit_uuid',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'limit_name',
            type: 'varchar',
          },
          {
            name: 'line_code',
            type: 'varchar',
          },
          {
            name: 'kbk_code',
            type: 'varchar',
          },
          {
            name: 'kosgu',
            type: 'varchar',
          },
          {
            name: 'current_year_rub_value',
            type: 'decimal',
          },
          {
            name: 'current_year_currency_value',
            type: 'decimal',
            isNullable: true,
          },
          {
            name: 'current_year_currency_code',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'first_year_rub_value',
            type: 'decimal',
          },
          {
            name: 'first_year_currency_value',
            type: 'decimal',
            isNullable: true,
          },
          {
            name: 'first_year_currency_code',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'second_year_rub_value',
            type: 'decimal',
          },
          {
            name: 'second_year_currency_value',
            type: 'decimal',
            isNullable: true,
          },
          {
            name: 'second_year_currency_code',
            type: 'varchar',
            isNullable: true,
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
      'Limits',
      new TableForeignKey({
        columnNames: ['current_year_currency_code'],
        referencedColumnNames: ['currency_code'],
        referencedTableName: 'Currencies',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      'Limits',
      new TableForeignKey({
        columnNames: ['first_year_currency_code'],
        referencedColumnNames: ['currency_code'],
        referencedTableName: 'Currencies',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      'Limits',
      new TableForeignKey({
        columnNames: ['second_year_currency_code'],
        referencedColumnNames: ['currency_code'],
        referencedTableName: 'Currencies',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )

    await queryRunner.createTable(
      new Table({
        name: 'LimitEvents',
        columns: [
          {
            name: 'limit_event_uuid',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'limit_event_name',
            type: 'varchar',
          },
          {
            name: 'old_value',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'new_value',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'limit_uuid',
            type: 'uuid',
          },
          {
            name: 'user_uuid',
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
      'LimitEvents',
      new TableForeignKey({
        columnNames: ['limit_uuid'],
        referencedColumnNames: ['limit_uuid'],
        referencedTableName: 'Limits',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      'LimitEvents',
      new TableForeignKey({
        columnNames: ['user_uuid'],
        referencedColumnNames: ['user_uuid'],
        referencedTableName: 'Users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Limits')
  }
}
