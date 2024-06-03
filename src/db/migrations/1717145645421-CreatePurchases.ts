import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreatePurchases1717145645421 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'PurchaseTypes',
        columns: [
          {
            name: 'purchase_type_id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'purchase_type_name',
            type: 'varchar',
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

    await queryRunner.createTable(
      new Table({
        name: 'PurchaseSteps',
        columns: [
          {
            name: 'purchase_step_id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'purchase_step_name',
            type: 'varchar',
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

    await queryRunner.createTable(
      new Table({
        name: 'Purchases',
        columns: [
          {
            name: 'purchase_uuid',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'purchase_name',
            type: 'varchar',
          },
          {
            name: 'purchase_type_id',
            type: 'int',
          },
          {
            name: 'initiator_uuid', // user
            type: 'uuid',
          },
          {
            name: 'executor_uuid', // organization
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'purchase_identification_code',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'contract_identification_code',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'start_date',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'end_date',
            type: 'timestamp',
          },
          {
            name: 'start_max_price',
            type: 'decimal',
            isNullable: true,
          },
          {
            name: 'end_price',
            type: 'decimal',
            isNullable: true,
          },
          {
            name: 'currency_code',
            type: 'varchar',
          },
          {
            name: 'purchase_step_id',
            type: 'int',
          },
          {
            name: 'delivery_address',
            type: 'varchar',
          },
          {
            name: 'is_organization_fund',
            type: 'bool',
          },
          {
            name: 'application_enforcement',
            type: 'decimal',
            isNullable: true,
          },
          {
            name: 'is_unilateral_refusal',
            type: 'bool',
          },
          {
            name: 'contract_enforcement',
            type: 'decimal',
            isNullable: true,
          },
          {
            name: 'quality_guarantee_period', // months
            type: 'int',
          },
          {
            name: 'manufacturer_guarantee', // months
            type: 'int',
            isNullable: true,
          },
          {
            name: 'warranty_obligations_enforcement',
            type: 'decimal',
            isNullable: true,
          },
          {
            name: 'additional_info',
            type: 'text',
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
      'Purchases',
      new TableForeignKey({
        columnNames: ['purchase_type_id'],
        referencedColumnNames: ['purchase_type_id'],
        referencedTableName: 'PurchaseTypes',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      'Purchases',
      new TableForeignKey({
        columnNames: ['initiator_uuid'],
        referencedColumnNames: ['user_uuid'],
        referencedTableName: 'Users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      'Purchases',
      new TableForeignKey({
        columnNames: ['executor_uuid'],
        referencedColumnNames: ['organization_uuid'],
        referencedTableName: 'Organizations',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      'Purchases',
      new TableForeignKey({
        columnNames: ['currency_code'],
        referencedColumnNames: ['currency_code'],
        referencedTableName: 'Currencies',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      'Purchases',
      new TableForeignKey({
        columnNames: ['purchase_step_id'],
        referencedColumnNames: ['purchase_step_id'],
        referencedTableName: 'PurchaseSteps',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )

    await queryRunner.createTable(
      new Table({
        name: 'PurchaseEvents',
        columns: [
          {
            name: 'purchase_event_uuid',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'purchase_event_name',
            type: 'varchar',
          },
          {
            name: 'old_value',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'new_value',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'purchase_uuid',
            type: 'uuid',
          },
          {
            name: 'user_uuid',
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
      'PurchaseEvents',
      new TableForeignKey({
        columnNames: ['purchase_uuid'],
        referencedColumnNames: ['purchase_uuid'],
        referencedTableName: 'Purchases',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      'PurchaseEvents',
      new TableForeignKey({
        columnNames: ['user_uuid'],
        referencedColumnNames: ['user_uuid'],
        referencedTableName: 'Users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('PurchaseEvents')
    await queryRunner.dropTable('Purchases')
    await queryRunner.dropTable('PurchaseSteps')
    await queryRunner.dropTable('PurchaseTypes')
  }
}
