import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { BoardService } from './board.service';
import { PostBoardRequestDto } from './dto/request';
import { JwtAuthGuard } from '../../guard/jwt-auth.guard';
import { GetSignInUser } from '../../decorator';
import { GetBoardResponseDto, PostBoardResponseDto } from './dto/response';

@Controller('/api/v1/board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  postBoard(
    @Body() requestBody: PostBoardRequestDto,
    @GetSignInUser() email: string
  ): Promise<PostBoardResponseDto> {
    return this.boardService.postBoard(requestBody, email);
  }

  @Get('/:boardNumber')
  getBoard(@Param('boardNumber') boardNumber: number): Promise<GetBoardResponseDto> {
    return this.boardService.getBoard(boardNumber);
  }
}
