import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateUsers1715943970995 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'LegalBasis',
        columns: [
          {
            name: 'legal_basis_uuid',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'legal_basis_name',
            type: 'varchar',
          },
          {
            name: 'legal_basis_number',
            type: 'varchar',
          },
          {
            name: 'legal_basis_date',
            type: 'timestamp',
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
        name: 'People',
        columns: [
          {
            name: 'person_uuid',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'last_name',
            type: 'varchar',
          },
          {
            name: 'first_name',
            type: 'varchar',
          },
          {
            name: 'patronymic',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'post',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'legal_basis_uuid',
            type: 'uuid',
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
      'People',
      new TableForeignKey({
        columnNames: ['legal_basis_uuid'],
        referencedColumnNames: ['legal_basis_uuid'],
        referencedTableName: 'LegalBasis',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )

    await queryRunner.createTable(
      new Table({
        name: 'Roles',
        columns: [
          {
            name: 'role_id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'role_name',
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
        name: 'Users',
        columns: [
          {
            name: 'user_uuid',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'person_uuid',
            type: 'uuid',
          },
          {
            name: 'role_id',
            type: 'int',
          },
          {
            name: 'is_active',
            type: 'bool',
            default: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'phone',
            type: 'varchar',
            isUnique: true,
            isNullable: true,
          },
          {
            name: 'password',
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

    await queryRunner.createForeignKey(
      'Users',
      new TableForeignKey({
        columnNames: ['person_uuid'],
        referencedColumnNames: ['person_uuid'],
        referencedTableName: 'People',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      'Users',
      new TableForeignKey({
        columnNames: ['role_id'],
        referencedColumnNames: ['role_id'],
        referencedTableName: 'Roles',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )

    await queryRunner.createTable(
      new Table({
        name: 'Auths',
        columns: [
          {
            name: 'auth_uuid',
            type: 'uuid',
            isPrimary: true,
            default: 'gen_random_uuid()',
          },
          {
            name: 'user_uuid',
            type: 'uuid',
          },
          {
            name: 'user_agent',
            type: 'varchar',
            default: true,
          },
          {
            name: 'ip_address',
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

    await queryRunner.createForeignKey(
      'Auths',
      new TableForeignKey({
        columnNames: ['user_uuid'],
        referencedColumnNames: ['user_uuid'],
        referencedTableName: 'Users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('Users')
    const foreignKeys = table.foreignKeys
    await queryRunner.dropForeignKeys('Users', foreignKeys)

    const authTable = await queryRunner.getTable('Auths')
    const authForeignKeys = authTable.foreignKeys
    await queryRunner.dropForeignKeys('Auths', authForeignKeys)

    await queryRunner.dropTable('Auths')
    await queryRunner.dropTable('Users')
    await queryRunner.dropTable('People')
    await queryRunner.dropTable('Roles')
  }
}
