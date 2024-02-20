import { ResponseDto } from '../../../../types/classes';
import { ResponseCode, ResponseMessage } from '../../../../types/enums';
import { GetPopularListResultSet } from '../../../data-access/entities/result-set';

export class GetPopularListResponseDto extends ResponseDto {
  private popularWordList: string[];

  constructor(resultSets: GetPopularListResultSet[]) {
    super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    this.popularWordList = resultSets.map(resultSet => resultSet.searchWord);
  }

  static success(resultSets: GetPopularListResultSet[]) {
    return new GetPopularListResponseDto(resultSets);
  }
}
