import { ResponseDto } from '../../../../types/classes';
import { BoardListItem } from '../../../../types/interfaces';
import { BoardListViewEntity } from '../../../data-access/entities';
import { ResponseCode, ResponseMessage } from '../../../../types/enums';

export class GetSearchListResponseDto extends ResponseDto {
  private searchList: BoardListItem[];

  constructor(boardListViewEntities: BoardListViewEntity[]) {
    super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    this.searchList = boardListViewEntities;
  }

  static success(boardListViewEntities: BoardListViewEntity[]): GetSearchListResponseDto {
    return new GetSearchListResponseDto(boardListViewEntities);
  }
}
