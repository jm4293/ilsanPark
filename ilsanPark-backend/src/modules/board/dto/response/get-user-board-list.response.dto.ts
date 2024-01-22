import { ResponseDto } from '../../../../types/classes';
import { BoardListItem } from '../../../../types/interfaces';
import { ResponseCode, ResponseMessage } from '../../../../types/enums';
import { BadRequestException } from '@nestjs/common';

export class GetUserBoardListResponseDto extends ResponseDto {
  private userBoardList: BoardListItem[];

  constructor(userBoardList: BoardListItem[]) {
    super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    this.userBoardList = userBoardList;
  }

  static success(userBoardList: BoardListItem[]): GetUserBoardListResponseDto {
    return new GetUserBoardListResponseDto(userBoardList);
  }

  static noExistUser() {
    throw new BadRequestException(
      new ResponseDto(ResponseCode.NO_EXIST_USER, ResponseMessage.NO_EXIST_USER)
    );
  }
}
