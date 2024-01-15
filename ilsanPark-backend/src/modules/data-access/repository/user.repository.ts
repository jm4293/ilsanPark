import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities';
import { DataSource, Repository } from 'typeorm';
import { ResponseDto } from '../../../types/classes';

@Injectable()
export class UserRepository {
  private readonly logger = new Logger('User Repository');
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
    private readonly dataSource: DataSource
  ) {}

  async existsByEmail(email: string): Promise<boolean> {
    try {
      const result = await this.repository.findOne({ where: { email: email } });
      return !!result;
    } catch (exception) {
      this.logger.error(exception.message);
      ResponseDto.databaseError();
    }
  }

  async existsByNickname(nickname: string): Promise<boolean> {
    try {
      const result = await this.repository.findOne({ where: { nickname: nickname } });
      return !!result;
    } catch (exception) {
      this.logger.error(exception.message);
      ResponseDto.databaseError();
    }
  }

  async existsByTelNumber(telNumber: string): Promise<boolean> {
    try {
      const result = await this.repository.findOne({ where: { telNumber: telNumber } });
      return !!result;
    } catch (exception) {
      this.logger.error(exception.message);
      ResponseDto.databaseError();
    }
  }

  async findByEmail(email: string): Promise<UserEntity> {
    try {
      const userEntity = await this.repository.findOne({ where: { email: email } });
      return userEntity;
    } catch (exception) {
      this.logger.error(exception.message);
      ResponseDto.databaseError();
    }
  }

  async save(userEntity: UserEntity): Promise<UserEntity> {
    try {
      return await this.repository.save(userEntity);
    } catch (exception) {
      this.logger.error(exception.message);
      ResponseDto.databaseError();
    }
  }
}
