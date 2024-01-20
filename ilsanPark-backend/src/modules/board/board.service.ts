import { Injectable } from '@nestjs/common';
import {
  BoardRepository,
  CommentRepository,
  ImageRepository,
  UserRepository,
} from '../data-access/repository';
import { PatchBoardRequestDto, PostBoardRequestDto, PostCommentRequestDto } from './dto/request';
import {
  GetBoardResponseDto,
  GetCommentListResponseDto,
  PatchBoardResponseDto,
  PostBoardResponseDto,
  PostCommentResponseDto,
} from './dto/response';

@Injectable()
export class BoardService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly boardRepository: BoardRepository,
    private readonly imageRepository: ImageRepository,
    private readonly commentRepository: CommentRepository
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
}
