import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteEntity } from '../entities';
import { DataSource, Repository } from 'typeorm';
import { ResponseDto } from '../../../types/classes';

@Injectable()
export class FavoriteRepository {
  private readonly logger = new Logger('Favorite Repository');

  constructor(
    @InjectRepository(FavoriteEntity)
    private readonly repository: Repository<FavoriteEntity>,
    private readonly dataSource: DataSource
  ) {}

  create(boardNumber: number, userEmail: string) {
    try {
      return this.repository.create({ boardNumber, userEmail });
    } catch (err) {
      this.logger.error(err.message);
      ResponseDto.databaseError();
    }
  }

  async save(favoriteEntity: FavoriteEntity) {
    try {
      return await this.repository.save(favoriteEntity);
    } catch (err) {
      this.logger.error(err.message);
      ResponseDto.databaseError();
    }
  }

  async existsByBoardNumberAndUserEmail(boardNumber: number, userEmail: string) {
    try {
      return await this.repository.exists({ where: { boardNumber, userEmail } });
    } catch (err) {
      this.logger.error(err.message);
      ResponseDto.databaseError();
    }
  }

  async getFavoriteList(boardNumber: number) {
    try {
      return await this.dataSource
        .createQueryBuilder()
        .select('U.email', 'email')
        .addSelect('U.nickname', 'nickname')
        .addSelect('U.profileImage', 'profileImage')
        .from('favorite', 'F')
        .innerJoin('user', 'U', 'F.user_email = U.email')
        .where('F.board_number = :boardNumber', { boardNumber })
        .getRawMany();
    } catch (err) {
      this.logger.error(err.message);
      ResponseDto.databaseError();
    }
  }

  async deleteByBoardNumberAndUserEmail(boardNumber: number, userEmail: string) {
    try {
      return await this.repository.delete({ boardNumber, userEmail });
    } catch (err) {
      this.logger.error(err.message);
      ResponseDto.databaseError();
    }
  }
}
