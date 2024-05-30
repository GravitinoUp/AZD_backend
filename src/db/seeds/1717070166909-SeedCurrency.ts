import { Currency } from 'src/modules/currency/entities/currency.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedCurrency1717070166909 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(Currency, [
      {
        currency_code: 'rub',
        currency_name: 'Рубль',
      },
      {
        currency_code: 'usd',
        currency_name: 'Доллар',
      },
      {
        currency_code: 'eur',
        currency_name: 'Евро',
      },
      {
        currency_code: 'cny',
        currency_name: 'Китайский юань',
      },
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('Currencies')
  }
}
