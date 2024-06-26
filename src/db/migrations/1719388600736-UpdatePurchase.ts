import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdatePurchase1719388600736 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE public."Purchases" ALTER COLUMN purchase_name DROP NOT NULL;',
    )
    await queryRunner.query(
      'ALTER TABLE public."Purchases" ALTER COLUMN purchase_type_id DROP NOT NULL;',
    )
    await queryRunner.query(
      'ALTER TABLE public."Purchases" ALTER COLUMN initiator_uuid DROP NOT NULL;',
    )
    await queryRunner.query(
      'ALTER TABLE public."Purchases" ALTER COLUMN executor_uuid DROP NOT NULL;',
    )
    await queryRunner.query('ALTER TABLE public."Purchases" ALTER COLUMN end_date DROP NOT NULL;')
    await queryRunner.query(
      'ALTER TABLE public."Purchases" ALTER COLUMN currency_code DROP NOT NULL;',
    )
    await queryRunner.query(
      'ALTER TABLE public."Purchases" ALTER COLUMN purchase_step_id DROP NOT NULL;',
    )
    await queryRunner.query(
      'ALTER TABLE public."Purchases" ALTER COLUMN delivery_address DROP NOT NULL;',
    )
    await queryRunner.query(
      'ALTER TABLE public."Purchases" ALTER COLUMN is_organization_fund DROP NOT NULL;',
    )
    await queryRunner.query(
      'ALTER TABLE public."Purchases" ALTER COLUMN is_unilateral_refusal DROP NOT NULL;',
    )
    await queryRunner.query(
      'ALTER TABLE public."Purchases" ALTER COLUMN quality_guarantee_period DROP NOT NULL;',
    )
    await queryRunner.query(
      'ALTER TABLE public."Purchases" ALTER COLUMN warranty_obligations_enforcement DROP NOT NULL;',
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE public."Purchases" ALTER COLUMN purchase_name SET NOT NULL;',
    )
    await queryRunner.query(
      'ALTER TABLE public."Purchases" ALTER COLUMN purchase_type_id SET NOT NULL;',
    )
    await queryRunner.query(
      'ALTER TABLE public."Purchases" ALTER COLUMN initiator_uuid SET NOT NULL;',
    )
    await queryRunner.query(
      'ALTER TABLE public."Purchases" ALTER COLUMN executor_uuid SET NOT NULL;',
    )
    await queryRunner.query('ALTER TABLE public."Purchases" ALTER COLUMN end_date SET NOT NULL;')
    await queryRunner.query(
      'ALTER TABLE public."Purchases" ALTER COLUMN currency_code SET NOT NULL;',
    )
    await queryRunner.query(
      'ALTER TABLE public."Purchases" ALTER COLUMN purchase_step_id SET NOT NULL;',
    )
    await queryRunner.query(
      'ALTER TABLE public."Purchases" ALTER COLUMN delivery_address SET NOT NULL;',
    )
    await queryRunner.query(
      'ALTER TABLE public."Purchases" ALTER COLUMN is_organization_fund SET NOT NULL;',
    )
    await queryRunner.query(
      'ALTER TABLE public."Purchases" ALTER COLUMN is_unilateral_refusal SET NOT NULL;',
    )
    await queryRunner.query(
      'ALTER TABLE public."Purchases" ALTER COLUMN quality_guarantee_period SET NOT NULL;',
    )
    await queryRunner.query(
      'ALTER TABLE public."Purchases" ALTER COLUMN warranty_obligations_enforcement SET NOT NULL;',
    )
  }
}
