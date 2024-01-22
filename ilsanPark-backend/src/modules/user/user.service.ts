import { Injectable } from '@nestjs/common';
import {
  GetSignInUserResponseDto,
  GetUserResponseDto,
  PatchNicknameResponseDto,
} from './dto/response';
import { UserRepository } from '../data-access/repository';
import { PatchNicknameRequestDto } from './dto/request';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUser(email: string): Promise<GetUserResponseDto> {
    const UserEntity = await this.userRepository.findByEmail(email);

    if (!UserEntity) {
      GetUserResponseDto.noExistUser();
    }

    return GetUserResponseDto.success(UserEntity);
  }

  async getSignInUser(email: string): Promise<GetSignInUserResponseDto> {
    const UserEntity = await this.userRepository.findByEmail(email);

    if (!UserEntity) {
      GetSignInUserResponseDto.noExistUser();
    }

    return GetSignInUserResponseDto.success(UserEntity);
  }

  async patchNickname(
    dto: PatchNicknameRequestDto,
    email: string
  ): Promise<PatchNicknameResponseDto> {
    const userEntity = await this.userRepository.findByEmail(email);

    if (!userEntity) {
      PatchNicknameResponseDto.noExistUser();
    }

    const { nickname } = dto;
    const isExistNickname = await this.userRepository.existsByNickname(nickname);

    if (isExistNickname) {
      PatchNicknameResponseDto.duplicateNickname();
    }

    userEntity.nickname = nickname;
    await this.userRepository.save(userEntity);

    return PatchNicknameResponseDto.success();
  }
}
