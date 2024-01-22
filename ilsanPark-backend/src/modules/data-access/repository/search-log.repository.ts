import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchLogEntity } from '../entities';
import { DataSource, Repository } from 'typeorm';
import { ResponseDto } from '../../../types/classes';

@Injectable()
export class SearchLogRepository {
  private readonly logger = new Logger('Search Log Repository');

  constructor(
    @InjectRepository(SearchLogEntity)
    private readonly repository: Repository<SearchLogEntity>,
    private readonly dataSource: DataSource
  ) {}

  create(searchWord: string, relationWord: string, relation: boolean) {
    console.log('searchWord', searchWord);
    console.log('relationWord', relationWord);
    console.log('relation', relation);

    try {
      return this.repository.create({
        searchWord,
        relationWord: relationWord ? relationWord : null,
        relation,
      });
    } catch (err) {
      this.logger.error(err.message);
      ResponseDto.databaseError();
    }
  }

  async save(searchLogEntity: SearchLogEntity) {
    console.log('searchLogEntity', searchLogEntity);
    try {
      await this.repository.save(searchLogEntity);
    } catch (err) {
      this.logger.error(err.message);
      ResponseDto.databaseError();
    }
  }
}
