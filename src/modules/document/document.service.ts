import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DefaultPagination } from 'src/common/constants/constants'
import { formatFilter } from 'src/utils/format-filter'
import { Repository } from 'typeorm'
import { CreateDocumentDto, UpdateDocumentDto } from './dto'
import { DocumentFilter } from './filters'
import { StatusDocumentResponse, ArrayDocumentResponse } from './response'
import { Document } from './entities/document.entity'

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
  ) {}

  async create(document: CreateDocumentDto): Promise<StatusDocumentResponse> {
    try {
      const newDocument = await this.documentRepository
        .createQueryBuilder()
        .insert()
        .values({
          ...document,
        })
        .returning('*')
        .execute()

      return { status: true, data: newDocument.raw[0] }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll(documentFilter: DocumentFilter): Promise<ArrayDocumentResponse> {
    try {
      const count = documentFilter?.offset?.count ?? DefaultPagination.COUNT
      const page = documentFilter?.offset?.page ?? DefaultPagination.PAGE
      const filters = formatFilter(documentFilter?.filter ?? {})

      const documents = await this.documentRepository.findAndCount({
        relations: { document_type: true },
        where: filters,
        order: documentFilter.sorts,
        skip: count * (page - 1),
        take: count,
      })

      return { count: documents[1], data: documents[0] }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async isExists(document_uuid: string): Promise<boolean> {
    try {
      const isDocumentExists = await this.documentRepository
        .createQueryBuilder()
        .select()
        .where({ document_uuid })
        .getExists()

      return isDocumentExists
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(document: UpdateDocumentDto): Promise<StatusDocumentResponse> {
    try {
      const updateDocument = await this.documentRepository
        .createQueryBuilder()
        .update()
        .where({ document_uuid: document.document_uuid })
        .set({
          ...document,
        })
        .execute()

      return { status: updateDocument.affected !== 0 }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async delete(document_uuid: string): Promise<StatusDocumentResponse> {
    try {
      const deleteDocument = await this.documentRepository
        .createQueryBuilder()
        .delete()
        .where({ document_uuid })
        .execute()

      return { status: deleteDocument.affected !== 0 }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
