import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PropertyName } from './entities/property-name.entity'
import { PropertyValue } from './entities/property-value.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { CreatePropertyDto, CreatePropertyValueDto } from './dto'
import { ArrayPropertyResponse, PropertyValueResponse, StatusPropertyResponse } from './response'
import { PropertyFilter } from './filter'
import { DefaultPagination } from 'src/common/constants/constants'
import { formatFilter } from 'src/utils/format-filter'

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(PropertyName)
    private propertyNameRepository: Repository<PropertyName>,
    @InjectRepository(PropertyValue)
    private propertyValueRepository: Repository<PropertyValue>,
    private dataSource: DataSource,
  ) {}

  async create(property: CreatePropertyDto): Promise<StatusPropertyResponse> {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()

    await queryRunner.startTransaction()
    try {
      const newProperty = await queryRunner.manager
        .getRepository(PropertyName)
        .createQueryBuilder()
        .insert()
        .useTransaction(true)
        .values({
          ...property,
        })
        .returning('*')
        .execute()

      const propertyNameUuid = newProperty.identifiers[0].property_name_uuid

      const propertyValues = []
      for (const value of property.property_values) {
        const propertyValue = new CreatePropertyValueDto()

        propertyValue.property_name_uuid = propertyNameUuid.toString()
        propertyValue.property_value = value

        propertyValues.push(propertyValue)
      }

      const newPropertyValues = await queryRunner.manager
        .getRepository(PropertyValue)
        .createQueryBuilder()
        .useTransaction(true)
        .insert()
        .values(propertyValues)
        .returning('*')
        .execute()

      await queryRunner.commitTransaction()

      return { status: true, data: { ...newProperty.raw[0], values: newPropertyValues.raw } }
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    } finally {
      await queryRunner.release()
    }
  }

  async findAll(propertyFilter: PropertyFilter): Promise<ArrayPropertyResponse> {
    try {
      const count = propertyFilter?.offset?.count ?? DefaultPagination.COUNT
      const page = propertyFilter?.offset?.page ?? DefaultPagination.PAGE
      const filters = formatFilter(propertyFilter?.filter ?? {})

      const properties = await this.propertyNameRepository.findAndCount({
        relations: { values: true },
        where: filters,
        order: propertyFilter.sorts,
        skip: count * (page - 1),
        take: count,
      })

      return { count: properties[1], data: properties[0] }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findByIds(ids: string[]): Promise<PropertyValueResponse[]> {
    try {
      const properties = await this.propertyValueRepository
        .createQueryBuilder('value')
        .select(['value.property_value_uuid', 'value.property_value'])
        .leftJoin('value.property_name', 'name')
        .addSelect(['name.property_name_uuid', 'name.property_name'])
        .where('"property_value_uuid" = ANY(:ids)', { ids })
        .getMany()

      return properties
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async isExists(property_name_uuid: string): Promise<boolean> {
    try {
      const isPropertyExists = await this.propertyNameRepository
        .createQueryBuilder()
        .select()
        .where({ property_name_uuid })
        .getExists()

      return isPropertyExists
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async delete(property_name_uuid: string): Promise<StatusPropertyResponse> {
    try {
      const updateRole = await this.propertyNameRepository
        .createQueryBuilder()
        .delete()
        .where({ property_name_uuid })
        .execute()

      return { status: updateRole.affected !== 0 }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
