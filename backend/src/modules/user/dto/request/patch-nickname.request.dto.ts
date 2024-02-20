import { IsNotEmpty } from 'class-validator';

export class PatchNicknameRequestDto {
  @IsNotEmpty()
  nickname: string;
}
