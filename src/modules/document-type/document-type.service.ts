import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DefaultPagination } from 'src/common/constants/constants'
import { formatFilter } from 'src/utils/format-filter'
import { Repository } from 'typeorm'
import { DocumentTypeFilter } from './filters'
import { ArrayDocumentTypeResponse } from './response'
import { DocumentType } from './entities/document-type.entity'

@Injectable()
export class DocumentTypeService {
  constructor(
    @InjectRepository(DocumentType)
    private documentTypeRepository: Repository<DocumentType>,
  ) {}

  async findAll(typeFilter: DocumentTypeFilter): Promise<ArrayDocumentTypeResponse> {
    try {
      const count = typeFilter?.offset?.count ?? DefaultPagination.COUNT
      const page = typeFilter?.offset?.page ?? DefaultPagination.PAGE
      const filters = formatFilter(typeFilter?.filter ?? {})

      const types = await this.documentTypeRepository.findAndCount({
        relations: {},
        where: filters,
        order: typeFilter.sorts,
        skip: count * (page - 1),
        take: count,
      })

      return { count: types[1], data: types[0] }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async isExists(document_type_id: number): Promise<boolean> {
    try {
      const isDocumentTypeExists = await this.documentTypeRepository
        .createQueryBuilder()
        .select()
        .where({ document_type_id })
        .getExists()

      return isDocumentTypeExists
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
