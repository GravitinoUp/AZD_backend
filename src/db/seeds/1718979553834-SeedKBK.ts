import { KBKValue } from 'src/modules/kbk/entities/kbk-value.entity'
import { KBK } from 'src/modules/kbk/entities/kbk.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedKBK1718979553834 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const kbkValues = await queryRunner.manager
      .getRepository(KBKValue)
      .createQueryBuilder()
      .insert()
      .values([
        {
          kbk_type: 'Культура',
          kbk_value: '0801',
        },
        {
          kbk_type:
            'Федеральный проект "Обеспечение качественно нового уровня развития инфраструктуры культуры" ("Культурная среда")',
          kbk_value: '00 0 А1 00000',
        },
        {
          kbk_type: 'Расходы на выплаты персоналу казенных учреждений',
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
          kbk_target_article_uuid: kbkValues.raw[1].kbk_value_uuid,
          kbk_expenses_type_uuid: kbkValues.raw[2].kbk_value_uuid,
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
          kbk_type: 'Фундаментальные исследования',
          kbk_value: '0110',
        },
        {
          kbk_type: 'Федеральный проект "Цифровые услуги и сервисы онлайн"',
          kbk_value: '00 0 DA 00000',
        },
        {
          kbk_type: 'Фонд оплаты труда учреждений',
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
          kbk_target_article_uuid: kbkValues1.raw[1].kbk_value_uuid,
          kbk_expenses_type_uuid: kbkValues1.raw[2].kbk_value_uuid,
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
          kbk_type: 'Государственный материальный резерв',
          kbk_value: '0109',
        },
        {
          kbk_type: 'Федеральный проект "Искусственный интеллект"',
          kbk_value: '00 0 D7 00000',
        },
        {
          kbk_type: 'Иные выплаты учреждений привлекаемым лицам',
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
          kbk_target_article_uuid: kbkValues2.raw[1].kbk_value_uuid,
          kbk_expenses_type_uuid: kbkValues2.raw[2].kbk_value_uuid,
        },
      ])
      .returning('*')
      .execute()
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('KBK')
  }
}
