import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm'

export class CreatePlanStatus1718028756991 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('Plans', new TableColumn({ name: 'plan_status_id', type: 'int' }))

    await queryRunner.createTable(
      new Table({
        name: 'PlanStatuses',
        columns: [
          {
            name: 'plan_status_id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'plan_status_name',
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
      'Plans',
      new TableForeignKey({
        columnNames: ['plan_status_id'],
        referencedColumnNames: ['plan_status_id'],
        referencedTableName: 'PlanStatuses',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('PlanStatuses')
  }
}
