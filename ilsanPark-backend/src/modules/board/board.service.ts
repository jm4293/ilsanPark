import { Injectable } from '@nestjs/common';
import { BoardRepository, ImageRepository, UserRepository } from '../data-access/repository';
import { PostBoardRequestDto } from './dto/request';
import { PostBoardResponseDto } from './dto/response';
import { GetBoardResponseDto } from './dto/response/get-board.response.dto';

@Injectable()
export class BoardService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly boardRepository: BoardRepository,
    private readonly imageRepository: ImageRepository
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

  async getBoard(boardNumber: number): Promise<GetBoardResponseDto> {
    const resultSet = await this.boardRepository.getBoard(boardNumber);

    if (!resultSet) {
      GetBoardResponseDto.noExistBoard();
    }

    const imageEntities = await this.imageRepository.findByBoardNumber(boardNumber);

    return GetBoardResponseDto.success(resultSet, imageEntities);
  }
}
