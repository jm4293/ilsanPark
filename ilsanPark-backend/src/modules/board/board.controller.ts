import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { BoardService } from './board.service';
import { PatchBoardRequestDto, PostBoardRequestDto } from './dto/request';
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

  @Patch('/:boardNumber')
  @UseGuards(JwtAuthGuard)
  patchBoard(
    @Body() requsetBody: PatchBoardRequestDto,
    @Param('boardNumber') boardNumber: number,
    @GetSignInUser() email: string
  ): Promise<PostBoardResponseDto> {
    return this.boardService.patchBoard(requsetBody, boardNumber, email);
  }
}
