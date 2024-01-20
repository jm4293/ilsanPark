import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { BoardService } from './board.service';
import { PatchBoardRequestDto, PostBoardRequestDto, PostCommentRequestDto } from './dto/request';
import { JwtAuthGuard } from '../../guard/jwt-auth.guard';
import { GetSignInUser } from '../../decorator';
import {
  GetBoardResponseDto,
  GetCommentListResponseDto,
  PostBoardResponseDto,
} from './dto/response';

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

  @Post('/:boardNumber/comment')
  @UseGuards(JwtAuthGuard)
  postComment(
    @Body() requestBodt: PostCommentRequestDto,
    @Param('boardNumber') boardNumber: number,
    @GetSignInUser() email: string
  ) {
    return this.boardService.postComment(requestBodt, boardNumber, email);
  }

  @Get('/:boardNumber')
  getBoard(@Param('boardNumber') boardNumber: number): Promise<GetBoardResponseDto> {
    return this.boardService.getBoard(boardNumber);
  }

  @Get('/:boardNumber/comment')
  getCommentList(@Param('boardNumber') boardNumber: number): Promise<GetCommentListResponseDto> {
    return this.boardService.getCommentList(boardNumber);
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
