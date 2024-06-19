import { AppEntity } from 'src/modules/entity/entities/app-entity.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedEntities1718699255175 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(AppEntity, [
      {
        entity_id: 1,
        entity_name: 'Планы-графики',
      },
      {
        entity_id: 2,
        entity_name: 'Лимиты',
      },
      {
        entity_id: 3,
        entity_name: 'Закупки',
      },
      {
        entity_id: 4,
        entity_name: 'Тех. задания',
      },
      {
        entity_id: 5,
        entity_name: 'Документы',
      },
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('Entities')
  }
}
