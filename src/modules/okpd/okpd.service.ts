import { Injectable } from '@nestjs/common'
import { Okpd } from './entities/okpd.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class OkpdService {
  constructor(
    @InjectRepository(Okpd)
    private okpdRepository: Repository<Okpd>,
  ) {}
}
