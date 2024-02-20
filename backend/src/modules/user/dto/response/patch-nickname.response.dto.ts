import { ResponseDto } from '../../../../types/classes';
import { ResponseCode, ResponseMessage } from '../../../../types/enums';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

export class PatchNicknameResponseDto extends ResponseDto {
  constructor() {
    super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
  }

  static success() {
    return new PatchNicknameResponseDto();
  }

  static duplicateNickname() {
    throw new BadRequestException(
      new ResponseDto(ResponseCode.DUPLICATE_NICKNAME, ResponseMessage.DUPLICATE_NICKNAME)
    );
  }

  static noExistUser() {
    throw new UnauthorizedException(
      new ResponseDto(ResponseCode.NO_EXIST_USER, ResponseMessage.NO_EXIST_USER)
    );
  }
}
