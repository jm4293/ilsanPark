import { IsOptional } from 'class-validator';

export class PatchProfileImageRequestDto {
  @IsOptional()
  profileImage: string | null;
}
