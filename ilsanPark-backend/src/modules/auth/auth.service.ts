import { Injectable } from '@nestjs/common';
import { SignInRequestDto, SignUpRequestDto } from './dto/request';
import { SignInResponseDto, SignUpResponseDto } from './dto/response';
import { UserRepository } from '../data-access/repository';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../data-access/entities';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository
  ) {}
  async signUp(dto: SignUpRequestDto): Promise<SignUpResponseDto> {
    const { email, nickname, telNumber, password } = dto;

    const isExistEmail = await this.userRepository.existsByEmail(email);
    if (isExistEmail) {
      SignUpResponseDto.duplicateEmail();
    }

    const isExistNickname = await this.userRepository.existsByNickname(nickname);
    if (isExistNickname) {
      SignUpResponseDto.duplicateNickname();
    }

    const isExistTelNumber = await this.userRepository.existsByTelNumber(telNumber);
    if (isExistTelNumber) {
      SignUpResponseDto.duplicateTelNumber();
    }

    const salt = await bcrypt.genSalt();
    const encodedPassword = await bcrypt.hash(password, salt);
    dto.password = encodedPassword;

    const userEntity: UserEntity = { ...dto, profileImage: null };
    await this.userRepository.save(userEntity);

    return SignUpResponseDto.success();
  }

  async signIn(dto: SignInRequestDto): Promise<SignInResponseDto> {
    const { email, password } = dto;
    const userEntity = await this.userRepository.findByEmail(email);
    if (!userEntity) {
      SignInResponseDto.signInFail();
    }

    const encodedPassword = userEntity.password;

    const isMatched = await bcrypt.compare(password, encodedPassword);

    if (!isMatched) {
      SignInResponseDto.signInFail();
    }

    const payload = { email };
    const token = this.jwtService.sign(payload);

    return SignInResponseDto.success(token);
  }
}
