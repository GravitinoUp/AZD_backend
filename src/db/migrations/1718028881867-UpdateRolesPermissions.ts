import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class UpdateRolesPermissions1718028881867 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'RolesPermissions',
      'role_permission_id',
      new TableColumn({
        name: 'role_permission_uuid',
        type: 'uuid',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'uuid',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'RolesPermissions',
      'role_permission_uuid',
      new TableColumn({
        name: 'role_permission_id',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      }),
    )
  }
}
