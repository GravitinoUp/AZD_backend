import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreatePlanGraph1716376639896 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'PlanWays',
        columns: [
          {
            name: 'way_id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'way_name',
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
        name: 'Plans',
        columns: [
          {
            name: 'plan_uuid',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'purchase_name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'purchase_price',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'purchase_date',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'purchase_uuid',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'user_uuid',
            type: 'uuid',
          },
          {
            name: 'kosgu',
            type: 'varchar',
          },
          {
            name: 'purchase_offer_number',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'okpd_uuid',
            type: 'uuid',
          },
          {
            name: 'object_name',
            type: 'text',
          },
          {
            name: 'okei_uuid',
            type: 'uuid',
          },
          {
            name: 'result_name',
            type: 'varchar',
          },
          {
            name: 'npa_date',
            type: 'date',
          },
          {
            name: 'npa_number',
            type: 'varchar',
          },
          {
            name: 'current_year_plan_count',
            type: 'int',
            default: 0,
          },
          {
            name: 'current_year_plan_avg_price',
            type: 'decimal',
            default: 0,
          },
          {
            name: 'first_year_plan_count',
            type: 'int',
            default: 0,
          },
          {
            name: 'first_year_plan_avg_price',
            type: 'decimal',
            default: 0,
          },
          {
            name: 'second_year_plan_count',
            type: 'int',
            default: 0,
          },
          {
            name: 'second_year_plan_avg_price',
            type: 'decimal',
            default: 0,
          },
          {
            name: 'next_years_plan_count',
            type: 'int',
            default: 0,
          },
          {
            name: 'next_years_plan_avg_price',
            type: 'decimal',
            default: 0,
          },
          {
            name: 'current_year_limit',
            type: 'decimal',
            default: 0,
          },
          {
            name: 'first_year_limit',
            type: 'decimal',
            default: 0,
          },
          {
            name: 'second_year_limit',
            type: 'decimal',
            default: 0,
          },
          {
            name: 'next_years_limit',
            type: 'decimal',
            default: 0,
          },
          {
            name: 'start_max_price',
            type: 'decimal',
            default: 0,
          },
          {
            name: 'public_purchase_discussion',
            type: 'bool',
          },
          {
            name: 'authorized_institution',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'organizer_name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'placement_month',
            type: 'varchar',
          },
          {
            name: 'way_id',
            type: 'int',
          },
          {
            name: 'small_business',
            type: 'bool',
          },
          {
            name: 'initiator',
            type: 'varchar',
          },
          {
            name: 'branch_uuid',
            type: 'uuid',
          },
          {
            name: 'price_value',
            type: 'decimal',
            isNullable: true,
          },
          {
            name: 'savings',
            type: 'decimal',
            isNullable: true,
          },
          {
            name: 'contract_number',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'contract_date',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'contragent',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'approval_letter',
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
      true,
    )

    await queryRunner.createForeignKey(
      'Plans',
      new TableForeignKey({
        columnNames: ['way_id'],
        referencedColumnNames: ['way_id'],
        referencedTableName: 'PlanWays',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      'Plans',
      new TableForeignKey({
        columnNames: ['user_uuid'],
        referencedColumnNames: ['user_uuid'],
        referencedTableName: 'Users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      'Plans',
      new TableForeignKey({
        columnNames: ['branch_uuid'],
        referencedColumnNames: ['organization_uuid'],
        referencedTableName: 'Organizations',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Plans')
    await queryRunner.dropTable('PlanWays')
  }
}
