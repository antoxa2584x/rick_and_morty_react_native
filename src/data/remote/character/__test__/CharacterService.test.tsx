import {getCharacters} from '../CharacterService';
import {DomainCharacterResponse} from '../DomainModel/DomainCharacterModel';
import {apiResponse} from './__mocks__/ApiResponse.mock';

jest.mock('../../RequestManager', () => ({
  sendRequest: jest.fn(),
}));

describe('getCharacters', () => {
  it('Should call sendRequest with correct request model', async () => {
    const nextPage = 'somePage';

    require('../../RequestManager').sendRequest.mockResolvedValueOnce(
      apiResponse,
    );

    const result = await getCharacters(nextPage);
    console.log(result);
    const expectedRequestModel = {
      method: 'GET',
      rawUrl: true,
      url: nextPage,
    };
    expect(require('../../RequestManager').sendRequest).toHaveBeenCalledWith(
      expectedRequestModel,
    );

    expect(result).toBeInstanceOf(DomainCharacterResponse);
  });

  it('Should call sendRequest with default request model if nextPage is not provided', async () => {
    require('../../RequestManager').sendRequest.mockResolvedValueOnce(
      apiResponse,
    );

    const result = await getCharacters();
    console.log(result);
    const expectedRequestModel = {
      method: 'GET',
      rawUrl: false,
      url: 'character/',
    };
    expect(require('../../RequestManager').sendRequest).toHaveBeenCalledWith(
      expectedRequestModel,
    );

    expect(result).toBeInstanceOf(DomainCharacterResponse);
  });
});
