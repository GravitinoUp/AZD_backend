import { KBKType } from 'src/modules/kbk/entities/kbk-type.entity'
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'
import { SeedKBK1718979553834 } from '../seeds/1718979553834-SeedKBK'
import { SeedLimits1718365222304 } from '../seeds/1718365222304-SeedLimits'

export class UpdateKBK1719409730143 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const revertSeeds = new SeedKBK1718979553834()
    await revertSeeds.down(queryRunner)

    await queryRunner.manager.insert(KBKType, [
      {
        kbk_type_id: 5,
        kbk_type_name: 'Наименование показателя',
      },
    ])

    await queryRunner.changeColumn(
      'KBK',
      'kbk_name',
      new TableColumn({ name: 'kbk_name_uuid', type: 'uuid' }),
    )

    const limitSeeds = new SeedLimits1718365222304()
    await limitSeeds.up(queryRunner)
    const kbkSeeds = new SeedKBK1718979553834()
    await kbkSeeds.up(queryRunner)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(KBKType, { kbk_type_id: 5 })

    await queryRunner.changeColumn(
      'KBK',
      'kbk_name_uuid',
      new TableColumn({ name: 'kbk_name', type: 'varchar' }),
    )
  }
}
