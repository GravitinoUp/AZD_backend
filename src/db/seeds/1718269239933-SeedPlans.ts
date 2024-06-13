import { PlanStatusesEnum } from 'src/common/constants/constants'
import { Branch } from 'src/modules/branch/entities/branch.entity'
import { Plan } from 'src/modules/plan/entities/plan.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedPlans1718269239933 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const branches = await queryRunner.manager
      .getRepository(Branch)
      .createQueryBuilder()
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

    await queryRunner.manager.insert(Plan, [
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('PlanPositions')
    await queryRunner.clearTable('Plans')
    await queryRunner.clearTable('Branches')
  }
}
