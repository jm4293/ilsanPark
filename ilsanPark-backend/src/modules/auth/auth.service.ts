import { Injectable } from '@nestjs/common';
import { SignUpRequestDto } from './dto/request';
import { SignUpResponseDto } from './dto/response';
import { UserRepository } from '../data-access/repository';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../data-access/entities';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}
  async signUp(dto: SignUpRequestDto): Promise<SignUpResponseDto | void> {
    const { email, nickname, telNumber, password } = dto;

    const isExistEmail = await this.userRepository.existsByEmail(email);
    if (isExistEmail) {
      return SignUpResponseDto.duplicateEmail();
    }

    const isExistNickname = await this.userRepository.existsByNickname(nickname);
    if (isExistNickname) {
      return SignUpResponseDto.duplicateNickname();
    }

    const isExistTelNumber = await this.userRepository.existsByTelnumber(telNumber);
    if (isExistTelNumber) {
      return SignUpResponseDto.duplicateTelNumber();
    }

    const salt = await bcrypt.genSalt();
    const encodedPassword = await bcrypt.hash(password, salt);
    dto.password = encodedPassword;

    const userEntity: UserEntity = { ...dto, profileImage: null };
    await this.userRepository.save(userEntity);

    return SignUpResponseDto.success();
  }
}
