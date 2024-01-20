import { ResponseDto } from '../../../../types/classes';
import { ResponseCode, ResponseMessage } from '../../../../types/enums';
import { UnauthorizedException } from '@nestjs/common';

export class PostBoardResponseDto extends ResponseDto {
  constructor() {
    super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
  }

  static success() {
    return new PostBoardResponseDto();
  }

  static noExistUser() {
    throw new UnauthorizedException(
      new ResponseDto(ResponseCode.NO_EXIST_USER, ResponseMessage.NO_EXIST_USER)
    );
  }
}
