import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddCommercialOfferText1719838981461 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'CommercialOffers',
      new TableColumn({
        name: 'commercial_offer_text',
        type: 'text',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('CommercialOffers', 'commercial_offer_text')
  }
}
