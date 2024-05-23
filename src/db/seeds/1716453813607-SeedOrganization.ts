import { Organization } from 'src/modules/organization/entities/organization.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedOrganization1716453813607 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(Organization, [
      {
        organization_uuid: 'df33e1fe-664d-4bd1-bf14-12e8cf99e5ac',
        organization_type_id: 1,
        contact_person_uuid: 'df33e1fe-664d-4bd1-bf14-12e8cf99e5ac',
        full_name: 'FULL NAME',
        short_name: 'SHORT NAME',
        register_number: 'string',
        bic: 'string',
        address: 'string',
        mail_address: 'string',
        phone: 'string',
        fax: 'string',
        email: 'string',
        ogrn: 'string',
        inn: 'string',
        kpp: 'string',
        okpo: 'string',
        region: 'string',
        additional_info: 'string',
        web_site: 'string',
      },
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('Organizations')
  }
}
