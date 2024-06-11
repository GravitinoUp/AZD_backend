import { MigrationInterface, QueryRunner, TableUnique } from 'typeorm'

export class UpdateUserConstraints1718109537300 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createUniqueConstraint(
      'Users',
      new TableUnique({ name: 'person_unique', columnNames: ['person_uuid'] }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropUniqueConstraint('Users', 'person_unique')
  }
}
