import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateDocuments1718634189599 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'DocumentTypes',
        columns: [
          {
            name: 'document_type_id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'document_type_name',
            type: 'text',
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
        name: 'Documents',
        columns: [
          {
            name: 'document_uuid',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'document_name',
            type: 'text',
          },
          {
            name: 'document_type_id',
            type: 'int',
          },
          {
            name: 'purchase_uuid',
            type: 'uuid',
          },
          {
            name: 'executor_uuid',
            type: 'uuid',
          },
          {
            name: 'executor_person_uuid',
            type: 'uuid',
          },
          {
            name: 'customer_uuid',
            type: 'uuid',
          },
          {
            name: 'customer_person_uuid',
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
      'Documents',
      new TableForeignKey({
        name: 'FK_document_type_id',
        columnNames: ['document_type_id'],
        referencedColumnNames: ['document_type_id'],
        referencedTableName: 'DocumentTypes',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      'Documents',
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
      'Documents',
      new TableForeignKey({
        name: 'FK_executor_uuid',
        columnNames: ['executor_uuid'],
        referencedColumnNames: ['organization_uuid'],
        referencedTableName: 'Organizations',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      'Documents',
      new TableForeignKey({
        name: 'FK_executor_person_uuid',
        columnNames: ['executor_person_uuid'],
        referencedColumnNames: ['person_uuid'],
        referencedTableName: 'People',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      'Documents',
      new TableForeignKey({
        name: 'FK_customer_uuid',
        columnNames: ['customer_uuid'],
        referencedColumnNames: ['organization_uuid'],
        referencedTableName: 'Organizations',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      'Documents',
      new TableForeignKey({
        name: 'FK_customer_person_uuid',
        columnNames: ['customer_person_uuid'],
        referencedColumnNames: ['person_uuid'],
        referencedTableName: 'People',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('Documents', 'FK_document_type_uuid')
    await queryRunner.dropForeignKey('Documents', 'FK_purchase_uuid')
    await queryRunner.dropForeignKey('Documents', 'FK_executor_uuid')
    await queryRunner.dropForeignKey('Documents', 'FK_executor_person_uuid')
    await queryRunner.dropForeignKey('Documents', 'FK_customer_person_uuid')
    await queryRunner.dropTable('DocumentTypes')
    await queryRunner.dropTable('Documents')
  }
}
