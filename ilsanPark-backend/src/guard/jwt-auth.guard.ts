import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ResponseCode, ResponseMessage } from '../types/enums';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      throw (
        err ||
        new UnauthorizedException({
          code: ResponseCode.AUTHORIZATION_FAIL,
          message: ResponseMessage.AUTHORIZATION_FAIL,
        })
      );
    }

    return user;
  }
}
