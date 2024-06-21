import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class UpdateKBK1718979392895 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('KBK', 'kbk_subsection_uuid')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'KBK',
      new TableColumn({
        name: 'kbk_subsection_uuid',
        type: 'uuid',
      }),
    )
  }
}
