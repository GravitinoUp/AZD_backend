import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DefaultPagination } from 'src/common/constants/constants'
import { formatFilter } from 'src/utils/format-filter'
import { Repository, DataSource } from 'typeorm'
import { CreateRuleDto, UpdateRuleDto } from './dto'
import { Rule } from './entities/rule.entity'
import { RuleFilter } from './filters'
import { StatusRuleResponse, ArrayRuleResponse } from './response'

@Injectable()
export class RuleService {
  constructor(
    @InjectRepository(Rule)
    private ruleRepository: Repository<Rule>,
    private dataSource: DataSource,
  ) {}

  async create(rule: CreateRuleDto): Promise<StatusRuleResponse> {
    try {
      const newRule = await this.ruleRepository
        .createQueryBuilder()
        .insert()
        .values({
          ...rule,
        })
        .returning('*')
        .execute()

      return { status: true, data: newRule.raw[0] }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll(ruleFilter: RuleFilter): Promise<ArrayRuleResponse> {
    try {
      const count = ruleFilter?.offset?.count ?? DefaultPagination.COUNT
      const page = ruleFilter?.offset?.page ?? DefaultPagination.PAGE
      const filters = formatFilter(ruleFilter?.filter ?? {})

      const rules = await this.ruleRepository.findAndCount({
        where: filters,
        order: ruleFilter.sorts,
        skip: count * (page - 1),
        take: count,
      })

      return { count: rules[1], data: rules[0] }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async isExists(rule_uuid: string): Promise<boolean> {
    try {
      const isRuleExists = await this.ruleRepository
        .createQueryBuilder()
        .select()
        .where({ rule_uuid })
        .getExists()

      return isRuleExists
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(rule: UpdateRuleDto): Promise<StatusRuleResponse> {
    try {
      const updateRule = await this.ruleRepository
        .createQueryBuilder()
        .update()
        .where({ rule_uuid: rule.rule_uuid })
        .set({
          ...rule,
        })
        .execute()

      return { status: updateRule.affected !== 0 }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async delete(rule_uuid: string): Promise<StatusRuleResponse> {
    try {
      const deleteRule = await this.ruleRepository
        .createQueryBuilder()
        .delete()
        .where({ rule_uuid })
        .execute()

      return { status: deleteRule.affected !== 0 }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
