import { PurchaseType } from 'src/modules/purchase-type/entities/purchase-type.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedPurchaseTypes1717759949067 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(PurchaseType, [
      {
        purchase_type_id: 1,
        purchase_type_name: '44-ФЗ',
      },
      {
        purchase_type_id: 2,
        purchase_type_name: '223-ФЗ',
      },
      {
        purchase_type_id: 3,
        purchase_type_name: 'ПП РФ 615',
      },
      {
        purchase_type_id: 4,
        purchase_type_name: '94-ФЗ',
      },
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('PurchaseTypes')
  }
}
