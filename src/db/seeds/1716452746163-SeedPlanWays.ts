import { PlanWay } from 'src/modules/plan-way/entities/plan-way.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedPlanWays1716452746163 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(PlanWay, [
      {
        way_id: 1,
        way_name: 'Электронный конкурс',
      },
      {
        way_id: 2,
        way_name: 'Закрытый конкурс',
      },
      {
        way_id: 3,
        way_name: 'Электронный аукцион',
      },
      {
        way_id: 4,
        way_name: 'Закрытый аукцион',
      },
      {
        way_id: 5,
        way_name: 'Электронный запрос котировок',
      },
      {
        way_id: 6,
        way_name: 'Единственный поставщик (п. 1 ч. 1 ст. 93)',
      },
      {
        way_id: 7,
        way_name: 'Единственный поставщик (п. 2 ч. 1 ст. 93)',
      },
      {
        way_id: 8,
        way_name: 'Единственный поставщик (п. 4 ч. 1 ст. 93)',
      },
      {
        way_id: 9,
        way_name: 'Единственный поставщик (п. 6 ч. 1 ст. 93)',
      },
      {
        way_id: 10,
        way_name: 'Единственный поставщик (п. 8 ч. 1 ст. 93)',
      },
      {
        way_id: 11,
        way_name: 'Единственный поставщик (п. 9 ч. 1 ст. 93)',
      },
      {
        way_id: 12,
        way_name: 'Единственный поставщик (п. 19 ч. 1 ст. 93)',
      },
      {
        way_id: 13,
        way_name: 'Единственный поставщик (п. 16 ч. 1 ст. 93)',
      },
      {
        way_id: 14,
        way_name: 'Единственный поставщик (п. 22 ч. 1 ст. 93)',
      },
      {
        way_id: 15,
        way_name: 'Единственный поставщик (п. 23 ч. 1 ст. 93)',
      },
      {
        way_id: 16,
        way_name: 'Единственный поставщик (п. 29 ч. 1 ст. 93)',
      },
      {
        way_id: 17,
        way_name: 'Единственный поставщик (п. 32 ч. 1 ст. 93)',
      },
      {
        way_id: 18,
        way_name: 'Товары, работы, услуги',
      },
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('PlanWays')
  }
}
