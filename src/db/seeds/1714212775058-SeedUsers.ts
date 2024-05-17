import { RolesEnum } from 'src/common/constants/constants'
import { Person } from 'src/modules/person/entities/person.entity'
import { User } from 'src/modules/user/entities/user.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedUsers1714212775058 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(Person, [
      {
        person_uuid: 'df33e1fe-664d-4bd1-bf14-12e8cf99e5ac',
        last_name: 'Иванов',
        first_name: 'Иван',
        patronymic: 'Иванович',
        post: 'Администратор',
      },
    ])

    await queryRunner.manager.insert(User, [
      {
        user_uuid: 'df33e1fe-664d-4bd1-bf14-12e8cf99e5ac',
        person_uuid: 'df33e1fe-664d-4bd1-bf14-12e8cf99e5ac',
        role_id: RolesEnum.ADMIN,
        email: 'user1@mail.com',
        phone: '+79000000000',
        password: '$2b$10$pC/Kq/QBvFMC8GeTbErDYOpdwHkSQwrPzTbmja0pracuKg8Auppai',
      },
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('People')
    await queryRunner.clearTable('Users')
  }
}
