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
import { UserRepository } from './repository';

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
    BoardEntity,
    CommentEntity,
    ImageEntity,
    FavoriteEntity,
    SearchLogEntity,
    BoardListViewEntity,
  ],
  exports: [
    UserRepository,
    BoardEntity,
    CommentEntity,
    ImageEntity,
    FavoriteEntity,
    SearchLogEntity,
    BoardListViewEntity,
  ],
})
export class DataAccessModule {}
