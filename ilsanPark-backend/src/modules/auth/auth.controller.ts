import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInRequestDto, SignUpRequestDto } from './dto/request';
import { SignInResponseDto, SignUpResponseDto } from './dto/response';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  signUp(@Body() requestBody: SignUpRequestDto): Promise<SignUpResponseDto> {
    return this.authService.signUp(requestBody);
  }

  @Post('/sign-in')
  signIn(@Body() requestBody: SignInRequestDto): Promise<SignInResponseDto> {
    return this.authService.signIn(requestBody);
  }
}
