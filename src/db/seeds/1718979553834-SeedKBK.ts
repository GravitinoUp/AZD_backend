import { KBKValue } from 'src/modules/kbk/entities/kbk-value.entity'
import { KBK } from 'src/modules/kbk/entities/kbk.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'
import { SeedLimits1718365222304 } from './1718365222304-SeedLimits'

export class SeedKBK1718979553834 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const kbkValues = await queryRunner.manager
      .getRepository(KBKValue)
      .createQueryBuilder()
      .insert()
      .values([
        {
          kbk_type_id: 1,
          kbk_value: '08',
        },
        {
          kbk_type_id: 2,
          kbk_value: '01',
        },
        {
          kbk_type_id: 3,
          kbk_value: '00 0 А1 00000',
        },
        {
          kbk_type_id: 4,
          kbk_value: '110',
        },
      ])
      .returning('*')
      .execute()

    await queryRunner.manager
      .getRepository(KBK)
      .createQueryBuilder()
      .insert()
      .values([
        {
          kbk_name: 'TEST KBK 1',
          kbk_section_uuid: kbkValues.raw[0].kbk_value_uuid,
          kbk_subsection_uuid: kbkValues.raw[1].kbk_value_uuid,
          kbk_target_article_uuid: kbkValues.raw[2].kbk_value_uuid,
          kbk_expenses_type_uuid: kbkValues.raw[3].kbk_value_uuid,
        },
      ])
      .returning('*')
      .execute()

    const kbkValues1 = await queryRunner.manager
      .getRepository(KBKValue)
      .createQueryBuilder()
      .insert()
      .values([
        {
          kbk_type_id: 1,
          kbk_value: '01',
        },
        {
          kbk_type_id: 2,
          kbk_value: '10',
        },
        {
          kbk_type_id: 3,
          kbk_value: '00 0 DA 00000',
        },
        {
          kbk_type_id: 4,
          kbk_value: '111',
        },
      ])
      .returning('*')
      .execute()

    await queryRunner.manager
      .getRepository(KBK)
      .createQueryBuilder()
      .insert()
      .values([
        {
          kbk_name: 'TEST KBK 2',
          kbk_section_uuid: kbkValues1.raw[0].kbk_value_uuid,
          kbk_subsection_uuid: kbkValues1.raw[1].kbk_value_uuid,
          kbk_target_article_uuid: kbkValues1.raw[2].kbk_value_uuid,
          kbk_expenses_type_uuid: kbkValues1.raw[3].kbk_value_uuid,
        },
      ])
      .returning('*')
      .execute()

    const kbkValues2 = await queryRunner.manager
      .getRepository(KBKValue)
      .createQueryBuilder()
      .insert()
      .values([
        {
          kbk_type_id: 1,
          kbk_value: '0109',
        },
        {
          kbk_type_id: 2,
          kbk_value: '09',
        },
        {
          kbk_type_id: 3,
          kbk_value: '00 0 D7 00000',
        },
        {
          kbk_type_id: 4,
          kbk_value: '113',
        },
      ])
      .returning('*')
      .execute()

    await queryRunner.manager
      .getRepository(KBK)
      .createQueryBuilder()
      .insert()
      .values([
        {
          kbk_name: 'TEST KBK 3',
          kbk_section_uuid: kbkValues2.raw[0].kbk_value_uuid,
          kbk_subsection_uuid: kbkValues2.raw[1].kbk_value_uuid,
          kbk_target_article_uuid: kbkValues2.raw[2].kbk_value_uuid,
          kbk_expenses_type_uuid: kbkValues2.raw[3].kbk_value_uuid,
        },
      ])
      .returning('*')
      .execute()
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const revertLimitSeeds = new SeedLimits1718365222304()
    await revertLimitSeeds.down(queryRunner)

    await queryRunner.manager.query('TRUNCATE "KBK" CASCADE')
    await queryRunner.manager.query('TRUNCATE "KBKValues" CASCADE')
  }
}
