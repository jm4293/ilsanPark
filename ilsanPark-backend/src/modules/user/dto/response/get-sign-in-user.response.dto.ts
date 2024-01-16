import { ResponseDto } from '../../../../types/classes';
import { UserEntity } from '../../../data-access/entities';
import { ResponseCode, ResponseMessage } from '../../../../types/enums';
import { UnauthorizedException } from '@nestjs/common';

export class GetSignInUserResponseDto extends ResponseDto {
  private email: string;
  private nickname: string;
  private profileImage: string | null;

  constructor({ email, nickname, profileImage }: UserEntity) {
    super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    this.email = email;
    this.nickname = nickname;
    this.profileImage = profileImage;
  }

  static success(userEntity: UserEntity) {
    return new GetSignInUserResponseDto(userEntity);
  }

  static noExistUser() {
    return new UnauthorizedException(ResponseCode.NO_EXIST_USER, ResponseMessage.NO_EXIST_USER);
  }
}
