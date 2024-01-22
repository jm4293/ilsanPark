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

  async getPopularList() {
    try {
      return await this.dataSource
        .createQueryBuilder()
        .select('S.search_word', 'searchWord')
        .addSelect('COUNT(S.search_word)', 'count')
        .from('search_log', 'S')
        .where('S.relation = :relation', { relation: false })
        .groupBy('searchWord')
        .orderBy('count', 'DESC')
        .limit(15)
        .getRawMany();
    } catch (err) {
      this.logger.error(err.message);
      ResponseDto.databaseError();
    }
  }

  async getRelationList(searchWord: string) {
    try {
      return await this.dataSource
        .createQueryBuilder()
        .select('S.relation_word', 'relationWord')
        .addSelect('COUNT(S.relation_word)', 'count')
        .from('search_log', 'S')
        .where('S.search_word = :searchWord', { searchWord })
        .andWhere('S.relation_word IS NOT NULL')
        .groupBy('relationWord')
        .orderBy('count', 'DESC')
        .limit(15)
        .getRawMany();
    } catch (err) {
      this.logger.error(err.message);
      ResponseDto.databaseError();
    }
  }
}
