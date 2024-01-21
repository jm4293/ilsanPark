import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from '../entities';
import { DataSource, Repository } from 'typeorm';
import { PostCommentRequestDto } from '../../board/dto/request';
import { ResponseDto } from '../../../types/classes';
import { nowDatetime } from '../../../utils';
import { GetCommentListResultSet } from '../entities/result-set';

@Injectable()
export class CommentRepository {
  private readonly logger = new Logger('Comment Repository');

  constructor(
    @InjectRepository(CommentEntity)
    private readonly repository: Repository<CommentEntity>,
    private readonly dataSource: DataSource
  ) {}

  create(dto: PostCommentRequestDto, boardNumber: number, userEmail: string) {
    try {
      return this.repository.create({
        content: dto.content,
        writeDatetime: nowDatetime,
        userEmail,
        boardNumber,
      });
    } catch (err) {
      this.logger.error(err.message);
      ResponseDto.databaseError();
    }
  }

  async save(commentEntity: CommentEntity) {
    try {
      return await this.repository.save(commentEntity);
    } catch (err) {
      this.logger.error(err.message);
      ResponseDto.databaseError();
    }
  }

  async getCommentList(boardNumber: number) {
    try {
      const resultSets = await this.dataSource
        .createQueryBuilder()
        .select('U.nickname', 'nickname')
        .addSelect('U.profile_image', 'profileImage')
        .addSelect('C.write_datetime', 'writeDatetime')
        .addSelect('C.content', 'content')
        .from('comment', 'C')
        .innerJoin('user', 'U', 'C.user_email = U.email')
        .where('C.boardNumber = :boardNumber', { boardNumber })
        .orderBy('C.write_datetime', 'DESC')
        .getRawMany();

      return resultSets as GetCommentListResultSet[];
    } catch (err) {
      this.logger.error(err.message);
      ResponseDto.databaseError();
    }
  }

  async deleteByBoardNumber(boardNumber: number) {
    try {
      return await this.repository.delete({ boardNumber });
    } catch (err) {
      this.logger.error(err.message);
      ResponseDto.databaseError();
    }
  }
}
