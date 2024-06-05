import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { TechnicalTask } from './entities/technical_task.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateTechnicalTaskDto, UpdateTechnicalTaskDto } from './dto'
import { ArrayTechnicalTaskResponse, StatusTechnicalTaskResponse } from './response'
import { DefaultPagination } from 'src/common/constants/constants'
import { formatFilter } from 'src/utils/format-filter'
import { TechnicalTaskFilter } from './filters'

@Injectable()
export class TechnicalTaskService {
  constructor(
    @InjectRepository(TechnicalTask)
    private technicalTaskRepository: Repository<TechnicalTask>,
  ) {}

  async create(technicalTask: CreateTechnicalTaskDto): Promise<StatusTechnicalTaskResponse> {
    try {
      const newRole = await this.technicalTaskRepository
        .createQueryBuilder()
        .insert()
        .values({
          ...technicalTask,
        })
        .returning('*')
        .execute()

      return { status: true, data: newRole.raw[0] }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll(technicalTaskFilter: TechnicalTaskFilter): Promise<ArrayTechnicalTaskResponse> {
    try {
      const count = technicalTaskFilter?.offset?.count ?? DefaultPagination.COUNT
      const page = technicalTaskFilter?.offset?.page ?? DefaultPagination.PAGE
      const filters = formatFilter(technicalTaskFilter?.filter ?? {})

      const technicalTasks = await this.technicalTaskRepository.findAndCount({
        relations: {},
        where: filters,
        order: technicalTaskFilter.sorts,
        skip: count * (page - 1),
        take: count,
      })

      return { count: technicalTasks[1], data: technicalTasks[0] }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async isExists(technicalTask_uuid: string): Promise<boolean> {
    try {
      const isExists = await this.technicalTaskRepository
        .createQueryBuilder()
        .select()
        .where({ technicalTask_uuid })
        .getExists()

      return isExists
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(technicalTask: UpdateTechnicalTaskDto): Promise<StatusTechnicalTaskResponse> {
    try {
      const updateRole = await this.technicalTaskRepository
        .createQueryBuilder()
        .update()
        .where({ technicalTask_uuid: technicalTask.technical_task_uuid })
        .set({
          ...technicalTask,
        })
        .execute()

      return { status: updateRole.affected !== 0 }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async delete(technical_task_uuid: string): Promise<StatusTechnicalTaskResponse> {
    try {
      const deleteTechnicalTask = await this.technicalTaskRepository
        .createQueryBuilder()
        .delete()
        .where({ technical_task_uuid })
        .execute()

      return { status: deleteTechnicalTask.affected !== 0 }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
