import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import CharacterListItem from '../CharacterListItem';
import {apiResponse} from '../../../../../data/remote/character/__test__/__mocks__/ApiResponse.mock';

jest.mock('../../../../../data/local/character/CharacterLocalService', () => ({
  likeCharacter: jest.fn().mockResolvedValueOnce(true),
  disLikeCharacter: jest.fn().mockResolvedValueOnce(false),
  getCharacterStatus: jest.fn().mockResolvedValueOnce(true),
}));

describe('CharacterListItem', () => {
  const mockData = apiResponse.results[0];

  it('Should render correctly and handle like/dislike', async () => {
    const {getByText, getByTestId} = render(
      <CharacterListItem data={mockData} />,
    );
    const testService = require('../../../../../data/local/character/CharacterLocalService');

    const image = getByTestId('character_image');
    expect(image).toBeTruthy();
    expect(image.props.source.uri).toContain(
      'https://rickandmortyapi.com/api/character/avatar/361.jpeg',
    );

    expect(getByText('Toxic Rick')).toBeTruthy();
    expect(getByText('Dead')).toBeTruthy();
    expect(getByText('Earth')).toBeTruthy();

    await waitFor(() =>
      expect(testService.getCharacterStatus).toHaveBeenCalledWith(361),
    );
    expect(testService.getCharacterStatus).toHaveBeenCalledTimes(1);

    fireEvent.press(getByTestId('like-button'));
    await waitFor(() =>
      expect(testService.likeCharacter).toHaveBeenCalledWith(361),
    );

    fireEvent.press(getByTestId('like-button'));
    await waitFor(() =>
      expect(testService.disLikeCharacter).toHaveBeenCalledWith(361),
    );
  });
});
