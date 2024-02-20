import { ResponseDto } from '../../../../types/classes';
import { ResponseCode, ResponseMessage } from '../../../../types/enums';
import { CommentListItem } from '../../../../types/interfaces';
import { GetCommentListResultSet } from '../../../data-access/entities/result-set';
import { BadRequestException } from '@nestjs/common';

export class GetCommentListResponseDto extends ResponseDto {
  private commentList: CommentListItem[];

  constructor(resultSets: GetCommentListResultSet[]) {
    super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    this.commentList = resultSets;
  }

  static success(resultSets: GetCommentListResultSet[]) {
    return new GetCommentListResponseDto(resultSets);
  }

  static noExistBoard() {
    throw new BadRequestException(
      new ResponseDto(ResponseCode.NO_EXIST_BOARD, ResponseMessage.NO_EXIST_BOARD)
    );
  }
}
