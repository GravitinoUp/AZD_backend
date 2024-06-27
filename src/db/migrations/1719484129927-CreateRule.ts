import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateRule1719484129927 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Rules',
        columns: [
          {
            name: 'rule_uuid',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'rule_name',
            type: 'varchar',
          },
          {
            name: 'rule_field_on',
            type: 'varchar',
          },
          {
            name: 'rule_field_for',
            type: 'varchar',
          },
          {
            name: 'rule_operator',
            type: 'varchar',
          },
          {
            name: 'rule_condition_value',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Rules')
  }
}
