import { Injectable } from '@nestjs/common';
import {
  BoardRepository,
  CommentRepository,
  FavoriteRepository,
  ImageRepository,
  UserRepository,
} from '../data-access/repository';
import { PatchBoardRequestDto, PostBoardRequestDto, PostCommentRequestDto } from './dto/request';
import {
  DeleteBoardResponseDto,
  GetBoardResponseDto,
  GetCommentListResponseDto,
  GetFavoriteListResponseDto,
  PatchBoardResponseDto,
  PostBoardResponseDto,
  PostCommentResponseDto,
  PutFavoriteResponseDto,
} from './dto/response';

@Injectable()
export class BoardService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly boardRepository: BoardRepository,
    private readonly imageRepository: ImageRepository,
    private readonly commentRepository: CommentRepository,
    private readonly favoriteRepository: FavoriteRepository
  ) {}

  async postBoard(dto: PostBoardRequestDto, email: string): Promise<PostBoardResponseDto> {
    const isExistUser = await this.userRepository.existsByEmail(email);

    if (!isExistUser) {
      PostBoardResponseDto.noExistUser();
    }

    const boardEntity = this.boardRepository.create(dto, email);
    await this.boardRepository.save(boardEntity);

    const { boardImageList } = dto;
    const { boardNumber } = boardEntity;
    const imageEntityList = this.imageRepository.createAll(boardImageList, boardNumber);

    await this.imageRepository.saveAll(imageEntityList);

    return PostBoardResponseDto.success();
  }

  async postComment(
    dto: PostCommentRequestDto,
    boardNumber: number,
    email: string
  ): Promise<PostCommentResponseDto> {
    const isExistUser = await this.userRepository.existsByEmail(email);

    if (!isExistUser) {
      PostCommentResponseDto.noExistUser();
    }

    const boardEntity = await this.boardRepository.findByBoardNumber(boardNumber);

    if (!boardEntity) {
      PostCommentResponseDto.noExistBoard();
    }

    const commentEntity = this.commentRepository.create(dto, boardNumber, email);
    await this.commentRepository.save(commentEntity);

    boardEntity.commentCount += 1;
    await this.boardRepository.save(boardEntity);

    return PostCommentResponseDto.success();
  }

  async getBoard(boardNumber: number): Promise<GetBoardResponseDto> {
    const resultSet = await this.boardRepository.getBoard(boardNumber);

    if (!resultSet) {
      GetBoardResponseDto.noExistBoard();
    }

    const imageEntities = await this.imageRepository.findByBoardNumber(boardNumber);

    return GetBoardResponseDto.success(resultSet, imageEntities);
  }

  async getCommentList(boardNumber: number): Promise<GetCommentListResponseDto> {
    const isExistBoard = await this.boardRepository.existsByBoardNumber(boardNumber);

    if (!isExistBoard) {
      GetCommentListResponseDto.noExistBoard();
    }

    const resultSets = await this.commentRepository.getCommentList(boardNumber);

    return GetCommentListResponseDto.success(resultSets);
  }

  async getFavoriteList(boardNumber: number): Promise<GetFavoriteListResponseDto> {
    const isExistBoard = await this.boardRepository.existsByBoardNumber(boardNumber);

    if (!isExistBoard) {
      GetFavoriteListResponseDto.noExistBoard();
    }

    const resultSets = await this.favoriteRepository.getFavoriteList(boardNumber);

    return GetFavoriteListResponseDto.success(resultSets);
  }

  async patchBoard(
    dto: PatchBoardRequestDto,
    boardNumber: number,
    email: string
  ): Promise<PatchBoardResponseDto> {
    const isExistUser = await this.userRepository.existsByEmail(email);

    if (!isExistUser) {
      PatchBoardResponseDto.noExistUser();
    }

    const boardEntity = await this.boardRepository.findByBoardNumber(boardNumber);

    if (!boardEntity) {
      PatchBoardResponseDto.noExistBoard();
    }

    const { writerEmail } = boardEntity;
    const isWriter = writerEmail === email;

    if (!isWriter) {
      PatchBoardResponseDto.noPermission();
    }

    boardEntity.title = dto.title;
    boardEntity.content = dto.content;

    await this.boardRepository.save(boardEntity);

    await this.imageRepository.deleteByBoardNumber(boardNumber);

    const { boardImageList } = dto;
    const imageEntityList = this.imageRepository.createAll(boardImageList, boardNumber);
    await this.imageRepository.saveAll(imageEntityList);

    return PatchBoardResponseDto.success();
  }

  async putFavorite(boardNumber: number, email: string): Promise<PutFavoriteResponseDto> {
    const isExistUser = await this.userRepository.existsByEmail(email);

    if (!isExistUser) {
      PutFavoriteResponseDto.noExistUser();
    }

    const boardEntity = await this.boardRepository.findByBoardNumber(boardNumber);

    if (!boardEntity) {
      PutFavoriteResponseDto.noExistBoard();
    }

    const isExistFavorite = await this.favoriteRepository.existsByBoardNumberAndUserEmail(
      boardNumber,
      email
    );

    if (isExistFavorite) {
      await this.favoriteRepository.deleteByBoardNumberAndUserEmail(boardNumber, email);
      boardEntity.favoriteCount -= 1;
    } else {
      const favoriteEntity = this.favoriteRepository.create(boardNumber, email);
      await this.favoriteRepository.save(favoriteEntity);
      boardEntity.favoriteCount += 1;
    }

    await this.boardRepository.save(boardEntity);

    return PutFavoriteResponseDto.success();
  }

  async deleteBoard(boardNumber: number, email: string): Promise<DeleteBoardResponseDto> {
    const isExistUser = await this.userRepository.existsByEmail(email);

    if (!isExistUser) {
      DeleteBoardResponseDto.noExistUser();
    }

    const boardEntity = await this.boardRepository.findByBoardNumber(boardNumber);

    if (!boardEntity) {
      DeleteBoardResponseDto.noExistBoard();
    }

    const isWriter = boardEntity.writerEmail === email;

    if (!isWriter) {
      DeleteBoardResponseDto.noPermission();
    }

    await this.imageRepository.deleteByBoardNumber(boardNumber);
    await this.commentRepository.deleteByBoardNumber(boardNumber);
    await this.favoriteRepository.deleteByBoardNumber(boardNumber);
    await this.boardRepository.deleteByBoardNumber(boardNumber);

    return DeleteBoardResponseDto.success();
  }
}
