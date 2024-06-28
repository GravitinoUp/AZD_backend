import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddProperties1719566011438 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'Users',
      new TableColumn({
        name: 'property_values',
        type: 'uuid',
        isArray: true,
        default: 'array[]::uuid[]',
      }),
    )

    await queryRunner.addColumn(
      'Purchases',
      new TableColumn({
        name: 'property_values',
        type: 'uuid',
        isArray: true,
        default: 'array[]::uuid[]',
      }),
    )

    await queryRunner.addColumn(
      'Organizations',
      new TableColumn({
        name: 'property_values',
        type: 'uuid',
        isArray: true,
        default: 'array[]::uuid[]',
      }),
    )

    await queryRunner.addColumn(
      'Branches',
      new TableColumn({
        name: 'property_values',
        type: 'uuid',
        isArray: true,
        default: 'array[]::uuid[]',
      }),
    )

    await queryRunner.addColumn(
      'Roles',
      new TableColumn({
        name: 'property_values',
        type: 'uuid',
        isArray: true,
        default: 'array[]::uuid[]',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('Users', 'property_values')
    await queryRunner.dropColumn('Purchases', 'property_values')
    await queryRunner.dropColumn('Organizations', 'property_values')
    await queryRunner.dropColumn('Branches', 'property_values')
    await queryRunner.dropColumn('Roles', 'property_values')
  }
}
