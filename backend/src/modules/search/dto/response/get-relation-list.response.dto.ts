import { ResponseDto } from '../../../../types/classes';
import { ResponseCode, ResponseMessage } from '../../../../types/enums';
import { GetRelationListResultSet } from '../../../data-access/entities/result-set';

export class GetRelationListResponseDto extends ResponseDto {
  private relativeWordList: string[];

  constructor(resultSets: GetRelationListResultSet[]) {
    super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    this.relativeWordList = resultSets.map(resultSet => resultSet.relationWord);
  }

  static success(resultSets: GetRelationListResultSet[]) {
    return new GetRelationListResponseDto(resultSets);
  }
}
