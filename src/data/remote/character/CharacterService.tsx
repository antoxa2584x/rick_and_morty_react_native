import {BaseRequestModel, sendRequest} from '../RequestManager';
import {ApiCharacterResponse} from './APIModel/ApiCharacterModel';
import {DomainCharacterResponse} from './DomainModel/DomainCharacterModel';

export async function getCharacters(
  nextPage?: string | null,
): Promise<DomainCharacterResponse> {
  let requestModel: BaseRequestModel = {
    method: 'GET',
    rawUrl: nextPage != null,
    url: nextPage != null ? nextPage : 'character/',
  };

  return sendRequest<ApiCharacterResponse>(requestModel).then(results => {
    return new DomainCharacterResponse(results);
  });
}
