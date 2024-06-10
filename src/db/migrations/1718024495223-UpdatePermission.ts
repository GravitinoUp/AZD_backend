import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class UpdatePermission1718024495223 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'Permissions',
      'permission_description',
      new TableColumn({ name: 'permission_description', type: 'text', default: `''` }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'Permissions',
      'permission_description',
      new TableColumn({ name: 'permission_description', type: 'varchar' }),
    )
  }
}
