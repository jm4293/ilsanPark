import { Injectable } from '@nestjs/common';
import { GetSignInUserResponseDto, GetUserResponseDto } from './dto/response';
import { UserRepository } from '../data-access/repository';

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
}
