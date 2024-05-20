import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateOrganization1716213850074 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'OrganizationTypes',
        columns: [
          {
            name: 'organization_type_id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'organization_type_name',
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

    await queryRunner.createTable(
      new Table({
        name: 'Organizations',
        columns: [
          {
            name: 'organization_uuid',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'organization_type_id',
            type: 'int',
          },
          {
            name: 'contact_person_uuid',
            type: 'uuid',
          },
          {
            name: 'full_name',
            type: 'varchar',
          },
          {
            name: 'short_name',
            type: 'varchar',
          },
          {
            name: 'register_number',
            type: 'varchar',
          },
          {
            name: 'bic',
            type: 'varchar',
          },
          {
            name: 'address',
            type: 'varchar',
          },
          {
            name: 'mail_address',
            type: 'varchar',
          },
          {
            name: 'phone',
            type: 'varchar',
          },
          {
            name: 'fax',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'ogrn',
            type: 'varchar',
          },
          {
            name: 'inn',
            type: 'varchar',
          },
          {
            name: 'kpp',
            type: 'varchar',
          },
          {
            name: 'okpo',
            type: 'varchar',
          },
          {
            name: 'region',
            type: 'varchar',
          },
          {
            name: 'additional_info',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'web_site',
            type: 'varchar',
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

    await queryRunner.createForeignKey(
      'Organizations',
      new TableForeignKey({
        columnNames: ['organization_type_id'],
        referencedColumnNames: ['organization_type_id'],
        referencedTableName: 'OrganizationTypes',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      'Organizations',
      new TableForeignKey({
        columnNames: ['contact_person_uuid'],
        referencedColumnNames: ['person_uuid'],
        referencedTableName: 'People',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Permissions')
  }
}
