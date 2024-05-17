import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreatePermissions1715950047814 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Permissions',
        columns: [
          {
            name: 'permission_id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'permission_name',
            type: 'varchar',
          },
          {
            name: 'permission_description',
            type: 'varchar',
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
      true,
    )

    await queryRunner.createTable(
      new Table({
        name: 'RolesPermissions',
        columns: [
          {
            name: 'role_permission_id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'role_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'user_uuid',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'permission_id',
            type: 'varchar',
          },
          {
            name: 'rights',
            type: 'bool',
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
      'RolesPermissions',
      new TableForeignKey({
        columnNames: ['permission_id'],
        referencedColumnNames: ['permission_id'],
        referencedTableName: 'Permissions',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      'RolesPermissions',
      new TableForeignKey({
        columnNames: ['user_uuid'],
        referencedColumnNames: ['user_uuid'],
        referencedTableName: 'Users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      'RolesPermissions',
      new TableForeignKey({
        columnNames: ['role_id'],
        referencedColumnNames: ['role_id'],
        referencedTableName: 'Roles',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Permissions')
  }
}
