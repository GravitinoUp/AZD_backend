import { Permission } from 'src/modules/permission/entities/permission.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedPermissions1718022612663 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(Permission, [
      {
        permission_id: 'limit-create',
        permission_name: 'Создание лимитов',
        entity_name: 'limits',
      },
      {
        permission_id: 'limit-get',
        permission_name: 'Получение лимитов',
        entity_name: 'limits',
      },
      {
        permission_id: 'limit-update',
        permission_name: 'Редактирование лимитов',
        entity_name: 'limits',
      },
      {
        permission_id: 'limit-delete',
        permission_name: 'Удаление лимитов',
        entity_name: 'limits',
      },
      {
        permission_id: 'organization-create',
        permission_name: 'Создание организаций',
        entity_name: 'organizations',
      },
      {
        permission_id: 'organization-get',
        permission_name: 'Получение организаций',
        entity_name: 'organizations',
      },
      {
        permission_id: 'organization-update',
        permission_name: 'Редактирование организаций',
        entity_name: 'organizations',
      },
      {
        permission_id: 'organization-delete',
        permission_name: 'Удаление организаций',
        entity_name: 'organizations',
      },
      {
        permission_id: 'plan-create',
        permission_name: 'Создание планов',
        entity_name: 'plans',
      },
      {
        permission_id: 'plan-get',
        permission_name: 'Получение планов',
        entity_name: 'plans',
      },
      {
        permission_id: 'plan-update',
        permission_name: 'Редактирование планов',
        entity_name: 'plans',
      },
      {
        permission_id: 'plan-delete',
        permission_name: 'Удаление планов',
        entity_name: 'plans',
      },
      {
        permission_id: 'property-create',
        permission_name: 'Создание характеристик',
        entity_name: 'properties',
      },
      {
        permission_id: 'property-get',
        permission_name: 'Получение характеристик',
        entity_name: 'properties',
      },
      {
        permission_id: 'property-update',
        permission_name: 'Редактирование характеристик',
        entity_name: 'properties',
      },
      {
        permission_id: 'property-delete',
        permission_name: 'Удаление характеристик',
        entity_name: 'properties',
      },
      {
        permission_id: 'purchase-create',
        permission_name: 'Создание закупок',
        entity_name: 'purchases',
      },
      {
        permission_id: 'purchase-get',
        permission_name: 'Получение закупок',
        entity_name: 'purchases',
      },
      {
        permission_id: 'purchase-update',
        permission_name: 'Редактирование закупок',
        entity_name: 'purchases',
      },
      {
        permission_id: 'purchase-delete',
        permission_name: 'Удаление закупок',
        entity_name: 'purchases',
      },
      {
        permission_id: 'role-create',
        permission_name: 'Создание ролей',
        entity_name: 'roles',
      },
      {
        permission_id: 'role-get',
        permission_name: 'Получение ролей',
        entity_name: 'roles',
      },
      {
        permission_id: 'role-update',
        permission_name: 'Редактирование ролей',
        entity_name: 'roles',
      },
      {
        permission_id: 'role-delete',
        permission_name: 'Удаление ролей',
        entity_name: 'roles',
      },
      {
        permission_id: 'role-permission-create',
        permission_name: 'Создание разрешений ролей',
        entity_name: 'role-permissions',
      },
      {
        permission_id: 'role-permission-get',
        permission_name: 'Получение разрешений ролей',
        entity_name: 'role-permissions',
      },
      {
        permission_id: 'role-permission-update',
        permission_name: 'Редактирование разрешений ролей',
        entity_name: 'role-permissions',
      },
      {
        permission_id: 'role-permission-delete',
        permission_name: 'Удаление разрешений ролей',
        entity_name: 'role-permissions',
      },
      {
        permission_id: 'technical-task-create',
        permission_name: 'Создание технических заданий',
        entity_name: 'technical-tasks',
      },
      {
        permission_id: 'technical-task-get',
        permission_name: 'Получение технических заданий',
        entity_name: 'technical-tasks',
      },
      {
        permission_id: 'technical-task-update',
        permission_name: 'Редактирование технических заданий',
        entity_name: 'technical-tasks',
      },
      {
        permission_id: 'technical-task-delete',
        permission_name: 'Удаление технических заданий',
        entity_name: 'technical-tasks',
      },
      {
        permission_id: 'user-create',
        permission_name: 'Создание пользователей',
        entity_name: 'users',
      },
      {
        permission_id: 'user-get',
        permission_name: 'Получение пользователей',
        entity_name: 'users',
      },
      {
        permission_id: 'user-update',
        permission_name: 'Редактирование пользователей',
        entity_name: 'users',
      },
      {
        permission_id: 'user-delete',
        permission_name: 'Удаление пользователей',
        entity_name: 'users',
      },
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('Permissions')
  }
}
