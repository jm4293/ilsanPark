import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardListViewEntity } from '../entities';
import { Between, DataSource, Like, Repository } from 'typeorm';
import { ResponseDto } from '../../../types/classes';
import { aweekAgoDatetime, nowDatetime } from '../../../utils';

@Injectable()
export class BoardListViewRepository {
  private readonly logger = new Logger('Board List View Repository');

  constructor(
    @InjectRepository(BoardListViewEntity)
    private readonly repository: Repository<BoardListViewEntity>,
    private readonly dataSource: DataSource
  ) {}

  async getLatestList() {
    try {
      return this.repository.find({ order: { writeDatetime: 'DESC' } });
    } catch (err) {
      this.logger.error(err);
      ResponseDto.databaseError();
    }
  }

  async getTop3List() {
    try {
      return this.repository.find({
        where: { writeDatetime: Between(aweekAgoDatetime, nowDatetime) },
        order: {
          favoriteCount: 'DESC',
          commentCount: 'DESC',
          viewCount: 'DESC',
          writeDatetime: 'DESC',
        },
        take: 3,
      });
    } catch (err) {
      this.logger.error(err);
      ResponseDto.databaseError();
    }
  }

  async getSearchList(searchWord: string) {
    try {
      return this.repository.find({
        where: [{ title: Like(`%${searchWord}%`) }, { content: Like(`%${searchWord}%`) }],
        order: { writeDatetime: 'DESC' },
      });
    } catch (err) {
      this.logger.error(err);
      ResponseDto.databaseError();
    }
  }

  async getUserBoardList(writerEmail: string) {
    try {
      return this.repository.find({ where: { writerEmail }, order: { writeDatetime: 'DESC' } });
    } catch (err) {
      this.logger.error(err);
      ResponseDto.databaseError();
    }
  }
}
