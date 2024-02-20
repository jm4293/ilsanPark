import { ResponseDto } from '../../../../types/classes';
import { ResponseCode, ResponseMessage } from '../../../../types/enums';
import { BoardListViewEntity } from '../../../data-access/entities';

export class GetTop3ListResponseDto extends ResponseDto {
  private top3List: any[];

  constructor(boardListViewEntities: BoardListViewEntity[]) {
    super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    this.top3List = boardListViewEntities;
  }

  static success(boardListViewEntities: BoardListViewEntity[]) {
    return new GetTop3ListResponseDto(boardListViewEntities);
  }
}
