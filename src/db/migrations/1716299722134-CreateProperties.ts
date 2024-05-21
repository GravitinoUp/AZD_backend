import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateProperties1716299722134 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'PropertyNames',
        columns: [
          {
            name: 'property_name_uuid',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'property_name',
            type: 'varchar',
          },
          {
            name: 'entity_name',
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
      true,
    )

    await queryRunner.createTable(
      new Table({
        name: 'PropertyValues',
        columns: [
          {
            name: 'property_value_uuid',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'property_name_uuid',
            type: 'uuid',
          },
          {
            name: 'property_value',
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
      true,
    )

    await queryRunner.createForeignKey(
      'PropertyValues',
      new TableForeignKey({
        columnNames: ['property_name_uuid'],
        referencedColumnNames: ['property_name_uuid'],
        referencedTableName: 'PropertyNames',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('PropertyNames')
    await queryRunner.dropTable('PropertyValues')
  }
}
