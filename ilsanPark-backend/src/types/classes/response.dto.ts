import { ResponseCode, ResponseMessage } from '../enums';
import { InternalServerErrorException } from '@nestjs/common';

export class ResponseDto {
  constructor(
    private readonly code: ResponseCode,
    private readonly message: ResponseMessage
  ) {}

  static databaseError() {
    throw new InternalServerErrorException(
      new ResponseDto(ResponseCode.DATABASE_ERROR, ResponseMessage.DATABASE_ERROR)
    );
  }
}
