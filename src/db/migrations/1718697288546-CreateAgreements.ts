import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateAgreements1718697288546 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Entities',
        columns: [
          {
            name: 'entity_id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'entity_name',
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
    )

    await queryRunner.createTable(
      new Table({
        name: 'AgreementStatuses',
        columns: [
          {
            name: 'agreement_status_id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'agreement_status_name',
            type: 'varchar',
          },
          {
            name: 'entity_id',
            type: 'int',
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
    )

    await queryRunner.createForeignKey(
      'AgreementStatuses',
      new TableForeignKey({
        name: 'FK_entity_id',
        columnNames: ['entity_id'],
        referencedColumnNames: ['entity_id'],
        referencedTableName: 'Entities',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )

    await queryRunner.createTable(
      new Table({
        name: 'RoleAgreements',
        columns: [
          {
            name: 'role_agreement_uuid',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'parent_role_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'role_id',
            type: 'int',
          },
          {
            name: 'permission_id',
            type: 'varchar',
          },
          {
            name: 'entity_id',
            type: 'int',
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
    )

    await queryRunner.createForeignKey(
      'RoleAgreements',
      new TableForeignKey({
        name: 'FK_parent_role_id',
        columnNames: ['parent_role_id'],
        referencedColumnNames: ['role_id'],
        referencedTableName: 'Roles',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      'RoleAgreements',
      new TableForeignKey({
        name: 'FK_role_id',
        columnNames: ['role_id'],
        referencedColumnNames: ['role_id'],
        referencedTableName: 'Roles',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      'RoleAgreements',
      new TableForeignKey({
        name: 'FK_permission_id',
        columnNames: ['permission_id'],
        referencedColumnNames: ['permission_id'],
        referencedTableName: 'Permissions',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      'RoleAgreements',
      new TableForeignKey({
        name: 'FK_entity_id',
        columnNames: ['entity_id'],
        referencedColumnNames: ['entity_id'],
        referencedTableName: 'Entities',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )

    await queryRunner.createTable(
      new Table({
        name: 'Agreements',
        columns: [
          {
            name: 'agreement_uuid',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'role_agreement_uuid',
            type: 'uuid',
          },
          {
            name: 'agreement_status_id',
            type: 'int',
          },
          {
            name: 'document_uuid',
            type: 'uuid',
          },
          {
            name: 'entity_id',
            type: 'int',
          },
          {
            name: 'is_verified',
            type: 'bool',
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
    )

    await queryRunner.createForeignKey(
      'Agreements',
      new TableForeignKey({
        name: 'FK_role_agreement_uuid',
        columnNames: ['role_agreement_uuid'],
        referencedColumnNames: ['role_agreement_uuid'],
        referencedTableName: 'RoleAgreements',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      'Agreements',
      new TableForeignKey({
        name: 'FK_agreement_status_id',
        columnNames: ['agreement_status_id'],
        referencedColumnNames: ['agreement_status_id'],
        referencedTableName: 'AgreementStatuses',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      'Agreements',
      new TableForeignKey({
        name: 'FK_entity_id',
        columnNames: ['entity_id'],
        referencedColumnNames: ['entity_id'],
        referencedTableName: 'Entities',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('AgreementStatuses', 'FK_entity_id')
    await queryRunner.dropForeignKey('RoleAgreements', 'FK_parent_role_id')
    await queryRunner.dropForeignKey('RoleAgreements', 'FK_role_id')
    await queryRunner.dropForeignKey('RoleAgreements', 'FK_permission_id')
    await queryRunner.dropForeignKey('RoleAgreements', 'FK_entity_id')
    await queryRunner.dropForeignKey('Agreements', 'FK_role_agreement_uuid')
    await queryRunner.dropForeignKey('Agreements', 'FK_agreement_status_id')
    await queryRunner.dropForeignKey('Agreements', 'FK_entity_id')
    await queryRunner.dropTable('Entities')
    await queryRunner.dropTable('AgreementStatuses')
    await queryRunner.dropTable('RoleAgreements')
    await queryRunner.dropTable('Agreements')
  }
}
