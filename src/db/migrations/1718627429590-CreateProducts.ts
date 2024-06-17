import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateProducts1718627429590 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Products',
        columns: [
          {
            name: 'product_uuid',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'product_name',
            type: 'text',
          },
          {
            name: 'product_description',
            type: 'text',
          },
          {
            name: 'product_price',
            type: 'decimal',
          },
          {
            name: 'okei_uuid',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    )

    await queryRunner.createForeignKey(
      'Products',
      new TableForeignKey({
        name: 'FK_okei_uuid',
        columnNames: ['okei_uuid'],
        referencedColumnNames: ['okei_uuid'],
        referencedTableName: 'OKEI',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )

    await queryRunner.createTable(
      new Table({
        name: 'PurchaseProducts',
        columns: [
          {
            name: 'purchase_product_uuid',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'purchase_uuid',
            type: 'uuid',
          },
          {
            name: 'product_uuid',
            type: 'uuid',
          },
          {
            name: 'quantity',
            type: 'int',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    )

    await queryRunner.createForeignKey(
      'PurchaseProducts',
      new TableForeignKey({
        name: 'FK_purchase_uuid',
        columnNames: ['purchase_uuid'],
        referencedColumnNames: ['purchase_uuid'],
        referencedTableName: 'Purchases',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      'PurchaseProducts',
      new TableForeignKey({
        name: 'FK_product_uuid',
        columnNames: ['product_uuid'],
        referencedColumnNames: ['product_uuid'],
        referencedTableName: 'Products',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('Products', 'FK_okei_uuid')
    await queryRunner.dropForeignKey('PurchaseProducts', 'FK_purchase_uuid')
    await queryRunner.dropForeignKey('PurchaseProducts', 'FK_product_uuid')
    await queryRunner.dropTable('Products')
    await queryRunner.dropTable('PurchaseProducts')
  }
}
