import { ResponseDto } from '../../../../types/classes';
import { BoardListItem } from '../../../../types/interfaces';
import { BoardListViewEntity } from '../../../data-access/entities';
import { ResponseCode, ResponseMessage } from '../../../../types/enums';

export class GetLatestListResponseDto extends ResponseDto {
  private latestList: BoardListItem[];

  constructor(boardListViewEntities: BoardListViewEntity[]) {
    super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    this.latestList = boardListViewEntities;
  }

  static success(boardListViewEntities: BoardListViewEntity[]) {
    return new GetLatestListResponseDto(boardListViewEntities);
  }
}
