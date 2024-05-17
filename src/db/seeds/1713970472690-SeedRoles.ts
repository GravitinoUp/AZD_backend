import { Role } from 'src/modules/role/entities/role.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedRoles1713970472690 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(Role, [
      {
        role_id: 1,
        role_name: 'user',
      },
      { role_id: 2, role_name: 'admin' },
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('Roles')
  }
}
