import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm'

export class UpdatePlan1718115539081 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable('Plans', 'PlanPositions')
    await queryRunner.renameColumn('PlanPositions', 'plan_uuid', 'plan_position_uuid')
    await queryRunner.dropColumn('PlanPositions', 'plan_status_id')
    await queryRunner.addColumn(
      'PlanPositions',
      new TableColumn({ name: 'plan_uuid', type: 'uuid' }),
    )

    await queryRunner.createTable(
      new Table({
        name: 'Plans',
        columns: [
          {
            name: 'plan_uuid',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'plan_number',
            type: 'int',
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'plan_status_id',
            type: 'int',
          },
          {
            name: 'plan_version',
            type: 'int',
          },
          {
            name: 'branch_uuid',
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
      true,
    )

    await queryRunner.createForeignKey(
      'Plans',
      new TableForeignKey({
        name: 'FK_plan_status_id',
        columnNames: ['plan_status_id'],
        referencedColumnNames: ['plan_status_id'],
        referencedTableName: 'PlanStatuses',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      'Plans',
      new TableForeignKey({
        name: 'FK_branch_uuid',
        columnNames: ['branch_uuid'],
        referencedColumnNames: ['branch_uuid'],
        referencedTableName: 'Branches',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      'PlanPositions',
      new TableForeignKey({
        name: 'FK_plan_uuid',
        columnNames: ['plan_uuid'],
        referencedColumnNames: ['plan_uuid'],
        referencedTableName: 'Plans',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('Plans', 'FK_branch_uuid')
    await queryRunner.dropForeignKey('Plans', 'FK_plan_status_id')
    await queryRunner.dropForeignKey('PlanPositions', 'FK_plan_uuid')

    await queryRunner.dropTable('Plans')

    await queryRunner.renameTable('PlanPositions', 'Plans')
    await queryRunner.renameColumn('Plans', 'plan_position_uuid', 'plan_uuid')
    await queryRunner.addColumn('Plans', new TableColumn({ name: 'plan_status_id', type: 'int' }))
  }
}
