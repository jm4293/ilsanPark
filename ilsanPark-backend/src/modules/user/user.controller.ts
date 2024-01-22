import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import {
  GetSignInUserResponseDto,
  GetUserResponseDto,
  PatchNicknameResponseDto,
} from './dto/response';
import { GetSignInUser } from '../../decorator';
import { JwtAuthGuard } from '../../guard/jwt-auth.guard';
import { PatchNicknameRequestDto } from './dto/request';

@Controller('/api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:email')
  getUser(@Param('email') email: string): Promise<GetUserResponseDto> {
    return this.userService.getUser(email);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getSignInUser(@GetSignInUser() email: string): Promise<GetSignInUserResponseDto> {
    return this.userService.getSignInUser(email);
  }

  @Patch('/nickname')
  @UseGuards(JwtAuthGuard)
  patchNickname(
    @Body() requestBody: PatchNicknameRequestDto,
    @GetSignInUser() email: string
  ): Promise<PatchNicknameResponseDto> {
    return this.userService.patchNickname(requestBody, email);
  }
}
