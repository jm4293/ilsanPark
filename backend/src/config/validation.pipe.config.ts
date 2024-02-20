import { BadRequestException, ValidationPipeOptions } from '@nestjs/common';
import { ResponseDto } from '../types/classes';
import { ResponseCode, ResponseMessage } from '../types/enums';

export const ValidationPipeConfig: ValidationPipeOptions = {
  dismissDefaultMessages: true,
  exceptionFactory: () => {
    return new BadRequestException(
      new ResponseDto(ResponseCode.VALIDATION_FAIL, ResponseMessage.VALIDATION_FAIL)
    );
  },
};
