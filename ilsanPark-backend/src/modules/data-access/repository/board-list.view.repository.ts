import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardListViewEntity } from '../entities';
import { DataSource, Repository } from 'typeorm';
import { ResponseDto } from '../../../types/classes';

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
}
