import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateCommercialOffer1718883270155 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'CommercialOffers',
        columns: [
          {
            name: 'commercial_offer_uuid',
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
            name: 'organization_uuid',
            type: 'uuid',
          },
          {
            name: 'sum',
            type: 'decimal',
            isNullable: true,
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
      'CommercialOffers',
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
      'CommercialOffers',
      new TableForeignKey({
        name: 'FK_organization_uuid',
        columnNames: ['organization_uuid'],
        referencedColumnNames: ['organization_uuid'],
        referencedTableName: 'Organizations',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('CommercialOffers', 'FK_purchase_uuid')
    await queryRunner.dropForeignKey('CommercialOffers', 'FK_organization_uuid')
    await queryRunner.dropTable('CommercialOffers')
  }
}
