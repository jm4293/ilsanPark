import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from '../entities';
import { DataSource, Repository } from 'typeorm';
import { PostBoardRequestDto } from '../../board/dto/request';
import { ResponseDto } from '../../../types/classes';
import { nowDatetime } from '../../../utils';
import { GetBoardResultSet } from '../entities/result-set';

@Injectable()
export class BoardRepository {
  private readonly logger = new Logger('Board Repository');

  constructor(
    @InjectRepository(BoardEntity)
    private readonly repository: Repository<BoardEntity>,
    private readonly dataSource: DataSource
  ) {}

  create({ title, content }: PostBoardRequestDto, writerEmail: string) {
    try {
      return this.repository.create({
        title,
        content,
        writeDatetime: nowDatetime,
        favoriteCount: 0,
        commentCount: 0,
        viewCount: 0,
        writerEmail,
      });
    } catch (err) {
      this.logger.error(err.message);
      ResponseDto.databaseError();
    }
  }

  async save(boardEntity: BoardEntity) {
    try {
      return await this.repository.save(boardEntity);
    } catch (err) {
      this.logger.error(err.message);
      ResponseDto.databaseError();
    }
  }

  async existsByBoardNumber(boardNumber: number) {
    try {
      return await this.repository.exists({ where: { boardNumber } });
    } catch (err) {
      this.logger.error(err.message);
      ResponseDto.databaseError();
    }
  }

  async findByBoardNumber(boardNumber: number) {
    try {
      return await this.repository.findOne({ where: { boardNumber } });
    } catch (err) {
      this.logger.error(err.message);
      ResponseDto.databaseError();
    }
  }

  async getBoard(boardNumber: number) {
    try {
      const resultSets = await this.dataSource
        .createQueryBuilder()
        .select('B.board_number', 'boardNumber')
        .addSelect('B.title', 'title')
        .addSelect('B.content', 'content')
        .addSelect('B.write_datetime', 'writeDatetime')
        .addSelect('B.writer_email', 'writerEmail')
        .addSelect('U.nickname', 'writerNickname')
        .addSelect('U.profile_image', 'writerProfileImage')
        .from('board', 'B')
        .innerJoin('user', 'U', 'B.writer_email = U.email')
        .where('B.board_number = :boardNumber', { boardNumber })
        .getRawOne();

      return resultSets as GetBoardResultSet;
    } catch (err) {
      this.logger.error(err.message);
      ResponseDto.databaseError();
    }
  }
}
