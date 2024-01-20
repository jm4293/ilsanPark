import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageEntity } from '../entities';
import { DataSource, Repository } from 'typeorm';
import { ResponseDto } from '../../../types/classes';

@Injectable()
export class ImageRepository {
  private readonly logger = new Logger('Image Repository');

  constructor(
    @InjectRepository(ImageEntity)
    private readonly repository: Repository<ImageEntity>,
    private readonly dataSource: DataSource
  ) {}

  createAll(imageList: string[], boardNumber: number) {
    try {
      const entities = [];

      for (const image of imageList) {
        entities.push({
          image,
          boardNumber,
        });
      }

      return this.repository.create(entities);
    } catch (err) {
      this.logger.error(err.message);
      ResponseDto.databaseError();
    }
  }

  async saveAll(imageEntityList: ImageEntity[]) {
    try {
      return await this.repository.save(imageEntityList);
    } catch (err) {
      this.logger.error(err.message);
      ResponseDto.databaseError();
    }
  }
}
