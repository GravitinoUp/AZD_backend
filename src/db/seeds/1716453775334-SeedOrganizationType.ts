import { OrganizationType } from 'src/modules/organization-type/entities/organization-type.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedOrganizationType1716453775334 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(OrganizationType, [
      {
        organization_type_id: 1,
        organization_type_name: 'TEST',
      },
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('OrganizationTypes')
  }
}
