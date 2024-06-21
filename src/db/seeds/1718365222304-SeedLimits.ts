import { LimitStatusesEnum } from 'src/common/constants/constants'
import { Branch } from 'src/modules/branch/entities/branch.entity'
import { KBKValue } from 'src/modules/kbk/entities/kbk-value.entity'
import { KBK } from 'src/modules/kbk/entities/kbk.entity'
import { Kosgu } from 'src/modules/kosgu/entities/kosgu.entity'
import { Limit } from 'src/modules/limit/entities/limit.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedLimits1718365222304 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const kosgu = await queryRunner.manager
      .getRepository(Kosgu)
      .createQueryBuilder()
      .insert()
      .values([
        {
          kosgu_code: '112',
          kosgu_name: 'Госпошлины и другие сборы',
        },
      ])
      .returning('*')
      .execute()

    const kbkValues = await queryRunner.manager
      .getRepository(KBKValue)
      .createQueryBuilder()
      .insert()
      .values([
        {
          kbk_type: '04',
          kbk_value: '04',
        },
        {
          kbk_type: '12',
          kbk_value: '12',
        },
        {
          kbk_type: '24 3 02 94009',
          kbk_value: '24 3 02 94009',
        },
        {
          kbk_type: '414',
          kbk_value: '414',
        },
      ])
      .returning('*')
      .execute()

    const kbk = await queryRunner.manager
      .getRepository(KBK)
      .createQueryBuilder()
      .insert()
      .values([
        {
          kbk_name: 'TEST KBK',
          kbk_section_uuid: kbkValues.raw[0].kbk_value_uuid,
          kbk_target_article_uuid: kbkValues.raw[2].kbk_value_uuid,
          kbk_expenses_type_uuid: kbkValues.raw[3].kbk_value_uuid,
        },
      ])
      .returning('*')
      .execute()

    const branch = await queryRunner.manager
      .getRepository(Branch)
      .createQueryBuilder()
      .select()
      .getOne()

    await queryRunner.manager.insert(Limit, [
      {
        limit_name: 'TEST LIMIT',
        line_code: '0001',
        kbk_uuid: kbk.raw[0].kbk_uuid,
        kosgu_uuid: kosgu.raw[0].kosgu_uuid,
        limit_status_id: LimitStatusesEnum.CREATED,
        branch_uuid: branch.branch_uuid,
      },
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.query('TRUNCATE "Limits" CASCADE')
    await queryRunner.manager.query('TRUNCATE "KBKValues" CASCADE')
    await queryRunner.manager.query('TRUNCATE "KBK" CASCADE')
  }
}
