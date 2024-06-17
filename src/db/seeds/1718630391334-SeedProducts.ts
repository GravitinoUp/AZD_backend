import { Product } from 'src/modules/product/entities/product.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedProducts1718630391334 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const loremIpsum =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

    await queryRunner.manager.insert(Product, [
      {
        product_name: 'TEST PRODUCT',
        product_description: loremIpsum,
        product_price: 10000,
        okei_uuid: 'df33e1fe-664d-4bd1-bf14-12e8cf99e5ac',
      },
      {
        product_name: 'TEST PRODUCT 2',
        product_description: loremIpsum,
        product_price: 100000,
        okei_uuid: 'df33e1fe-664d-4bd1-bf14-12e8cf99e5ac',
      },
      {
        product_name: 'TEST PRODUCT 3',
        product_description: loremIpsum,
        product_price: 1000000,
        okei_uuid: 'df33e1fe-664d-4bd1-bf14-12e8cf99e5ac',
      },
      {
        product_name: 'TEST PRODUCT 4',
        product_description: loremIpsum,
        product_price: 10000000,
        okei_uuid: 'df33e1fe-664d-4bd1-bf14-12e8cf99e5ac',
      },
      {
        product_name: 'TEST PRODUCT 5',
        product_description: loremIpsum,
        product_price: 100000000,
        okei_uuid: 'df33e1fe-664d-4bd1-bf14-12e8cf99e5ac',
      },
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('Products')
  }
}
