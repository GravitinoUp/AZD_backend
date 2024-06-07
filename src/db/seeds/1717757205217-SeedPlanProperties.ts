import { PropertyName } from 'src/modules/properties/entities/property-name.entity'
import { PropertyValue } from 'src/modules/properties/entities/property-value.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedPlanProperties1717757205217 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Рз, ПР
    const resultPr = await queryRunner.manager
      .getRepository(PropertyName)
      .createQueryBuilder()
      .insert()
      .values({
        property_name: 'Рз, ПР',
        entity_name: 'plan',
      })
      .returning('*')
      .execute()

    await queryRunner.manager.insert(PropertyValue, [
      {
        property_name_uuid: resultPr.raw[0].property_name_uuid,
        property_value: '0412',
      },
      {
        property_name_uuid: resultPr.raw[0].property_name_uuid,
        property_value: '0108',
      },
    ])

    // ЦСР
    const result = await queryRunner.manager
      .getRepository(PropertyName)
      .createQueryBuilder()
      .insert()
      .values({
        property_name: 'ЦСР',
        entity_name: 'plan',
      })
      .returning('*')
      .execute()

    await queryRunner.manager.insert(PropertyValue, [
      {
        property_name_uuid: result.raw[0].property_name_uuid,
        property_value: '2430294009',
      },
      {
        property_name_uuid: result.raw[0].property_name_uuid,
        property_value: '2440190059',
      },
      {
        property_name_uuid: result.raw[0].property_name_uuid,
        property_value: '2440190071',
      },
      {
        property_name_uuid: result.raw[0].property_name_uuid,
        property_value: '2440290059',
      },
      {
        property_name_uuid: result.raw[0].property_name_uuid,
        property_value: '2440290071',
      },
      {
        property_name_uuid: result.raw[0].property_name_uuid,
        property_value: '4520194009',
      },
    ])

    // ВР
    const resultVr = await queryRunner.manager
      .getRepository(PropertyName)
      .createQueryBuilder()
      .insert()
      .values({
        property_name: 'ВР',
        entity_name: 'plan',
      })
      .returning('*')
      .execute()

    await queryRunner.manager.insert(PropertyValue, [
      {
        property_name_uuid: resultVr.raw[0].property_name_uuid,
        property_value: '242',
      },
      {
        property_name_uuid: resultVr.raw[0].property_name_uuid,
        property_value: '243',
      },
      {
        property_name_uuid: resultVr.raw[0].property_name_uuid,
        property_value: '244',
      },
      {
        property_name_uuid: resultVr.raw[0].property_name_uuid,
        property_value: '246',
      },
      {
        property_name_uuid: resultVr.raw[0].property_name_uuid,
        property_value: '247',
      },
      {
        property_name_uuid: resultVr.raw[0].property_name_uuid,
        property_value: '414',
      },
    ])

    // Код мероприятия по информатизации
    await queryRunner.manager
      .getRepository(PropertyName)
      .createQueryBuilder()
      .insert()
      .values({
        property_name: 'Код мероприятия по информатизации (для закупок по ВР 242, 246)',
        entity_name: 'plan',
      })
      .returning('*')
      .execute()
  }

  public async down(): Promise<void> {}
}
