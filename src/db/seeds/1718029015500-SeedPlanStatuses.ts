import { PlanStatus } from 'src/modules/plan-status/entities/plan-status.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedPlanStatuses1718029015500 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(PlanStatus, [
      {
        plan_status_id: 1,
        plan_status_name: 'На подготовке',
      },
      {
        plan_status_id: 2,
        plan_status_name: 'На согласовании',
      },
      {
        plan_status_id: 3,
        plan_status_name: 'Возврат на доработку',
      },
      {
        plan_status_id: 4,
        plan_status_name: 'Направлен на контроль',
      },
      {
        plan_status_id: 5,
        plan_status_name: 'Не принят на контроль',
      },
      {
        plan_status_id: 6,
        plan_status_name: 'На контроле',
      },
      {
        plan_status_id: 7,
        plan_status_name: 'Контроль не пройден',
      },
      {
        plan_status_id: 8,
        plan_status_name: 'Размещен',
      },
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('PlanStatuses')
  }
}
