import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm'

export class CreateBranch1718115401436 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('Plans')
    const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('branch_uuid') !== -1)
    await queryRunner.dropForeignKey('Plans', foreignKey)

    await queryRunner.dropColumn('Plans', 'branch_uuid')
    await queryRunner.createTable(
      new Table({
        name: 'Branches',
        columns: [
          {
            name: 'branch_uuid',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'branch_name',
            type: 'varchar',
          },
          {
            name: 'branch_address',
            type: 'text',
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
      true,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('Branches')
    const foreignKeys = table.foreignKeys
    await queryRunner.dropForeignKeys('Branches', foreignKeys)

    await queryRunner.dropTable('Branches')
    await queryRunner.addColumn(
      'Plans',
      new TableColumn({
        name: 'branch_uuid',
        type: 'uuid',
      }),
    )

    await queryRunner.createForeignKey(
      'Plans',
      new TableForeignKey({
        name: 'FK_branch_uuid',
        columnNames: ['branch_uuid'],
        referencedColumnNames: ['organization_uuid'],
        referencedTableName: 'Organizations',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )
  }
}
