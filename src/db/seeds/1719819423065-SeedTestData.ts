import { Okei } from 'src/modules/okei/entities/okei.entity'
import { Okpd } from 'src/modules/okpd/entities/okpd.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedTestData1719819423065 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(Okei, [
      {
        okei_code: '004',
        okei_full_name: 'Сантиметр',
        okei_short_name: 'см',
      },
      {
        okei_code: '006',
        okei_full_name: 'Метр',
        okei_short_name: 'м',
      },
      {
        okei_code: '163',
        okei_full_name: 'Грамм',
        okei_short_name: 'г',
      },
      {
        okei_code: '166',
        okei_full_name: 'Килограмм',
        okei_short_name: 'кг',
      },
      {
        okei_code: '055',
        okei_full_name: 'Квадратный метр',
        okei_short_name: 'м2',
      },
    ])

    await queryRunner.manager.insert(Okpd, [
      {
        okpd_code: '01.63.10',
        okpd_name: 'Услуги в области растениеводства, предоставляемые после сбора урожая',
        okpd_data_json: '',
      },
      {
        okpd_code: '01.64.10',
        okpd_name: 'Услуги по обработке и подготовке семян сельскохозяйственных культур к севу',
        okpd_data_json: '',
      },
      {
        okpd_code: '01.70.10',
        okpd_name: 'Услуги, связанные с охотой, ловлей и разведением диких животных',
        okpd_data_json: '',
      },
      {
        okpd_code: '36.00.20',
        okpd_name: 'Услуги по очистке вод и распределению воды по водопроводам',
        okpd_data_json: '',
      },
      {
        okpd_code: '39.00.22',
        okpd_name: 'Услуги по рекультивации прочие',
        okpd_data_json: '',
      },
      {
        okpd_code: '58.13.20',
        okpd_name: 'Услуги по рекультивации прочие',
        okpd_data_json: '',
      },
      {
        okpd_code: '58.14.20',
        okpd_name: 'Журналы и периодические издания электронные',
        okpd_data_json: '',
      },
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('OKEI')
    await queryRunner.clearTable('OKPD2')
  }
}
