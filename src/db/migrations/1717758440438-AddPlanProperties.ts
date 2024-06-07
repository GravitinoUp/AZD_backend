import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddPlanProperties1717758440438 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'Plans',
      new TableColumn({
        name: 'property_values',
        type: 'uuid',
        isArray: true,
        default: 'array[]::uuid[]',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('Plans', 'property_values')
  }
}
