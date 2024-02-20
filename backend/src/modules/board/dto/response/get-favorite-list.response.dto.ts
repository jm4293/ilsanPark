import { ResponseDto } from '../../../../types/classes';
import { FavoriteListItem } from '../../../../types/interfaces';
import { ResponseCode, ResponseMessage } from '../../../../types/enums';
import { GetFavoriteListResultSet } from '../../../data-access/entities/result-set';
import { BadRequestException } from '@nestjs/common';

export class GetFavoriteListResponseDto extends ResponseDto {
  private favoriteList: FavoriteListItem[];

  constructor(resultSets: GetFavoriteListResultSet[]) {
    super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    this.favoriteList = resultSets;
  }

  static success(resultSets: GetFavoriteListResultSet[]) {
    return new GetFavoriteListResponseDto(resultSets);
  }

  static noExistBoard() {
    throw new BadRequestException(
      new ResponseDto(ResponseCode.NO_EXIST_BOARD, ResponseMessage.NO_EXIST_BOARD)
    );
  }
}
