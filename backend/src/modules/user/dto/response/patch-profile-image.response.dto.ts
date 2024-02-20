import { ResponseDto } from '../../../../types/classes';
import { ResponseCode, ResponseMessage } from '../../../../types/enums';
import { UnauthorizedException } from '@nestjs/common';

export class PatchProfileImageResponseDto extends ResponseDto {
  constructor() {
    super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
  }

  static success() {
    return new PatchProfileImageResponseDto();
  }

  static noExistUser() {
    throw new UnauthorizedException(
      new ResponseDto(ResponseCode.NO_EXIST_USER, ResponseMessage.NO_EXIST_USER)
    );
  }
}
