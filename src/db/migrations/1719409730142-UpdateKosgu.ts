import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class UpdateKosgu1719409730142 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('Kosgu', 'kosgu_name')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('Kosgu', new TableColumn({ name: 'kosgu_name', type: 'varchar' }))
  }
}
