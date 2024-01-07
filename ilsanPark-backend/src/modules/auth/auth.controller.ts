import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../../guard/jwt-auth.guard';

@Controller('/api/v1/auth')
@UseGuards(JwtAuthGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('1')
  get() {
    return 'Hello Auth!';
  }

  @Get('2')
  get2() {
    return 'Hello Auth!';
  }
}
