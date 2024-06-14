import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm'

export class UpdateLimits1718365121599 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'Limits',
      'kosgu_uuid',
      new TableColumn({ name: 'kosgu_uuid', type: 'uuid', isNullable: true }),
    )
    await queryRunner.addColumn('Limits', new TableColumn({ name: 'branch_uuid', type: 'uuid' }))

    await queryRunner.createForeignKey(
      'Limits',
      new TableForeignKey({
        name: 'FK_branch_uuid',
        columnNames: ['branch_uuid'],
        referencedColumnNames: ['branch_uuid'],
        referencedTableName: 'Branches',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'Limits',
      'kosgu_uuid',
      new TableColumn({ name: 'kosgu_uuid', type: 'uuid', isNullable: false }),
    )
    await queryRunner.dropForeignKey('Limits', 'FK_branch_uuid')
    await queryRunner.dropColumn('Limits', 'branch_uuid')
  }
}
