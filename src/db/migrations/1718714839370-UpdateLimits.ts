import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm'

export class UpdateLimits1718714839370 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('Limits', [
      'current_year_rub_value',
      'current_year_currency_value',
      'current_year_currency_code',
      'first_year_rub_value',
      'first_year_currency_value',
      'first_year_currency_code',
      'second_year_rub_value',
      'second_year_currency_value',
      'second_year_currency_code',
    ])

    await queryRunner.addColumn(
      'Limits',
      new TableColumn({ name: 'years', type: 'uuid', isArray: true, default: 'array[]::uuid[]' }),
    )

    await queryRunner.createTable(
      new Table({
        name: 'LimitValues',
        columns: [
          {
            name: 'limit_value_uuid',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'limit_uuid',
            type: 'uuid',
          },
          {
            name: 'limit_value_year',
            type: 'int',
          },
          {
            name: 'rub_value',
            type: 'decimal',
          },
          {
            name: 'currency_value',
            type: 'decimal',
            isNullable: true,
          },
          {
            name: 'currency_code',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('Limits', 'years')

    await queryRunner.addColumns('Limits', [
      new TableColumn({
        name: 'current_year_rub_value',
        type: 'decimal',
      }),
      new TableColumn({
        name: 'current_year_currency_value',
        type: 'decimal',
        isNullable: true,
      }),
      new TableColumn({
        name: 'current_year_currency_code',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'first_year_rub_value',
        type: 'decimal',
      }),
      new TableColumn({
        name: 'first_year_currency_value',
        type: 'decimal',
        isNullable: true,
      }),
      new TableColumn({
        name: 'first_year_currency_code',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'second_year_rub_value',
        type: 'decimal',
      }),
      new TableColumn({
        name: 'second_year_currency_value',
        type: 'decimal',
        isNullable: true,
      }),
      new TableColumn({
        name: 'second_year_currency_code',
        type: 'varchar',
        isNullable: true,
      }),
    ])
  }
}
