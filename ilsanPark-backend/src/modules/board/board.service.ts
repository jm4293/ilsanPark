import { Injectable } from '@nestjs/common';
import { BoardRepository, ImageRepository, UserRepository } from '../data-access/repository';
import { PostBoardRequestDto } from './dto/request';
import { PostBoardResponseDto } from './dto/response';

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
    const imageEntityList = await this.imageRepository.createAll(boardImageList, boardNumber);

    await this.imageRepository.saveAll(imageEntityList);

    return PostBoardResponseDto.success();
  }
}
