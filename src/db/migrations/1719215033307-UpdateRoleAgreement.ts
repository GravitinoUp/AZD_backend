import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class UpdateRoleAgreement1719215033307 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('RoleAgreements', 'FK_permission_id')
    await queryRunner.dropColumn('RoleAgreements', 'permission_id')
    await queryRunner.dropColumn('Agreements', 'is_verified')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'RoleAgreements',
      new TableColumn({
        name: 'permission_id',
        type: 'varchar',
      }),
    )
    await queryRunner.addColumn(
      'Agreements',
      new TableColumn({
        name: 'is_verified',
        type: 'bool',
      }),
    )
  }
}
