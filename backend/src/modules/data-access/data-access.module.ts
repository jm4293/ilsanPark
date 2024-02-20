import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  UserEntity,
  BoardEntity,
  CommentEntity,
  ImageEntity,
  FavoriteEntity,
  SearchLogEntity,
  BoardListViewEntity,
} from './entities';
import {
  BoardListViewRepository,
  BoardRepository,
  CommentRepository,
  FavoriteRepository,
  ImageRepository,
  SearchLogRepository,
  UserRepository,
} from './repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      BoardEntity,
      CommentEntity,
      ImageEntity,
      FavoriteEntity,
      SearchLogEntity,
      BoardListViewEntity,
    ]),
  ],
  providers: [
    UserRepository,
    BoardRepository,
    CommentRepository,
    FavoriteRepository,
    ImageRepository,
    SearchLogRepository,
    BoardListViewRepository,
  ],
  exports: [
    UserRepository,
    BoardRepository,
    CommentRepository,
    FavoriteRepository,
    ImageRepository,
    SearchLogRepository,
    BoardListViewRepository,
  ],
})
export class DataAccessModule {}
