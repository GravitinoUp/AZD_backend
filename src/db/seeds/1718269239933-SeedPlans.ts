import { PlanStatusesEnum, PurchaseStepsEnum } from 'src/common/constants/constants'
import { Branch } from 'src/modules/branch/entities/branch.entity'
import { Kosgu } from 'src/modules/kosgu/entities/kosgu.entity'
import { Okpd } from 'src/modules/okpd/entities/okpd.entity'
import { PlanPosition } from 'src/modules/plan-position/entities/plan-position.entity'
import { Plan } from 'src/modules/plan/entities/plan.entity'
import { Purchase } from 'src/modules/purchase/entities/purchase.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedPlans1718269239933 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const branches = await queryRunner.manager
      .getRepository(Branch)
      .createQueryBuilder()
      .useTransaction(true)
      .insert()
      .values([
        {
          branch_name: 'Филиал 1',
          branch_address: '867177, Нижегородская область, город Павловский Посад, шоссе Ленина, 25',
        },
        {
          branch_name: 'Филиал 2',
          branch_address: '867177, Нижегородская область, город Павловский Посад, шоссе Ленина, 25',
        },
        {
          branch_name: 'Филиал 3',
          branch_address: '867177, Нижегородская область, город Павловский Посад, шоссе Ленина, 25',
        },
        {
          branch_name: 'Филиал 4',
          branch_address: '867177, Нижегородская область, город Павловский Посад, шоссе Ленина, 25',
        },
        {
          branch_name: 'Филиал 5',
          branch_address: '867177, Нижегородская область, город Павловский Посад, шоссе Ленина, 25',
        },
      ])
      .returning('*')
      .execute()

    const plans = await queryRunner.manager
      .getRepository(Plan)
      .createQueryBuilder()
      .insert()
      .values([
        {
          plan_status_id: PlanStatusesEnum.IN_PREPARATION,
          branch_uuid: branches.raw[0].branch_uuid,
        },
        {
          plan_status_id: PlanStatusesEnum.IN_PREPARATION,
          branch_uuid: branches.raw[1].branch_uuid,
        },
        {
          plan_status_id: PlanStatusesEnum.IN_PREPARATION,
          branch_uuid: branches.raw[2].branch_uuid,
        },
        {
          plan_status_id: PlanStatusesEnum.IN_PREPARATION,
          branch_uuid: branches.raw[3].branch_uuid,
        },
        {
          plan_status_id: PlanStatusesEnum.IN_PREPARATION,
          branch_uuid: branches.raw[4].branch_uuid,
        },
      ])
      .returning('*')
      .execute()

    const kosgu = await queryRunner.manager
      .getRepository(Kosgu)
      .createQueryBuilder()
      .insert()
      .values([
        {
          kosgu_code: '111',
          kosgu_name: 'Налоги',
        },
      ])
      .returning('*')
      .execute()

    const okpd = await queryRunner.manager
      .getRepository(Okpd)
      .createQueryBuilder()
      .insert()
      .values([
        {
          okpd_code: '0.0.0.0',
          okpd_name: 'ТЕСТ КОД',
          okpd_data_json: '',
        },
      ])
      .returning('*')
      .execute()

    for (let index = 0; index < 5; index++) {
      const purchase = await queryRunner.manager.insert(Purchase, [
        {
          purchase_name: `Purchase ${index}`,
          purchase_type_id: 1,
          initiator_uuid: 'df33e1fe-664d-4bd1-bf14-12e8cf99e5ac',
          executor_uuid: 'df33e1fe-664d-4bd1-bf14-12e8cf99e5ac',
          purchase_identification_code: '0888500000224000247',
          contract_identification_code: '3551600348424000002',
          start_date: '06-13-2024',
          end_application_date: '06-14-2024',
          executor_date: '06-24-2024',
          end_date: '07-01-2024',
          start_max_price: 1000.93,
          end_price: 113.22,
          currency_code: 'rub',
          purchase_step_id: PurchaseStepsEnum.APPLICATIONS,
          delivery_address: 'address',
          is_organization_fund: false,
          application_enforcement: 1000,
          is_unilateral_refusal: true,
          contract_enforcement: 500.3,
          quality_guarantee_period: 12,
          manufacturer_guarantee: 12,
          warranty_obligations_enforcement: 100,
          additional_info: 'Дополнительная информация',
        },
      ])

      await queryRunner.manager.insert(PlanPosition, [
        {
          plan_uuid: plans.raw[0].plan_uuid,
          purchase_uuid: purchase.raw[0].purchase_uuid,
          user_uuid: 'df33e1fe-664d-4bd1-bf14-12e8cf99e5ac',
          kosgu_uuid: kosgu.raw[0].kosgu_uuid,
          purchase_offer_number: '111',
          okpd_uuid: okpd.raw[0].okpd_uuid,
          object_name: 'TEST',
          okei_uuid: 'df33e1fe-664d-4bd1-bf14-12e8cf99e5ac',
          result_name: 'NAME',
          npa_date: '06-13-2024',
          npa_number: '111',
          current_year_plan_count: 10,
          current_year_plan_avg_price: 10,
          first_year_plan_count: 10,
          first_year_plan_avg_price: 10,
          second_year_plan_count: 10,
          second_year_plan_avg_price: 10,
          next_years_plan_count: 10,
          next_years_plan_avg_price: 10,
          current_year_limit: 10,
          first_year_limit: 10,
          second_year_limit: 10,
          next_years_limit: 10,
          start_max_price: 10,
          public_purchase_discussion: false,
          authorized_institution: 'NAME',
          organizer_name: 'NAME',
          placement_month: 'Ноябрь 2023',
          way_id: 1,
          small_business: false,
          initiator: 'INIT',
          price_value: 10,
          savings: 10,
          contract_number: '10',
          contract_date: '06-13-2024',
          contragent: '111',
          approval_letter: '111',
        },
      ])
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.query('TRUNCATE "PlanPositions" CASCADE')
    await queryRunner.manager.query('TRUNCATE "Plans" CASCADE')
    await queryRunner.manager.query('TRUNCATE "Branches" CASCADE')
  }
}
