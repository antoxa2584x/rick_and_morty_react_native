import {
  disLikeCharacter,
  getCharacterStatus,
  likeCharacter,
} from '../CharacterLocalService';

jest.mock('react-native', () => ({
  Platform: {
    OS: 'android',
  },
  NativeModules: {
    DatabaseModule: {
      likeCharacter: jest.fn(),
      disLikeCharacter: jest.fn(),
      getCharacterStatus: jest.fn(),
    },
  },
}));

describe('CharacterLocalService', () => {
  it('Should call likeCharacter in DatabaseModule on Android', async () => {
    const id = 1;

    require('react-native').NativeModules.DatabaseModule.likeCharacter.mockResolvedValueOnce(
      true,
    );

    const result = await likeCharacter(id);
    console.log(result);

    expect(
      require('react-native').NativeModules.DatabaseModule.likeCharacter,
    ).toHaveBeenCalledWith(id);

    expect(result).toBe(true);
  });

  it('Should call disLikeCharacter in DatabaseModule on Android', async () => {
    const id = 1;

    require('react-native').NativeModules.DatabaseModule.disLikeCharacter.mockResolvedValueOnce(
      false,
    );

    const result = await disLikeCharacter(id);
    console.log(result);
    expect(
      require('react-native').NativeModules.DatabaseModule.disLikeCharacter,
    ).toHaveBeenCalledWith(id);

    expect(result).toBe(false);
  });

  it('Should call getCharacterStatus in DatabaseModule on Android', async () => {
    const id = 1;

    require('react-native').NativeModules.DatabaseModule.getCharacterStatus.mockResolvedValueOnce(
      false,
    );

    const result = await getCharacterStatus(id);
    console.log(result);
    expect(
      require('react-native').NativeModules.DatabaseModule.disLikeCharacter,
    ).toHaveBeenCalledWith(id);

    expect(result).toBe(false);
  });

  jest.mock('react-native', () => ({
    Platform: {
      OS: 'ios',
    },
  }));

  it('Should call likeCharacter in DatabaseModule on iOS', async () => {
    const id = 1;

    require('react-native').NativeModules.DatabaseModule.likeCharacter.mockResolvedValueOnce(
      false,
    );

    const result = await likeCharacter(id);
    console.log(result);
    expect(
      require('react-native').NativeModules.DatabaseModule.likeCharacter,
    ).toHaveBeenCalledWith(id);

    expect(result).toBe(false);
  });

  it('Should call disLikeCharacter in DatabaseModule on iOS', async () => {
    const id = 1;

    require('react-native').NativeModules.DatabaseModule.disLikeCharacter.mockResolvedValueOnce(
      false,
    );

    const result = await disLikeCharacter(id);
    console.log(result);
    expect(
      require('react-native').NativeModules.DatabaseModule.disLikeCharacter,
    ).toHaveBeenCalledWith(id);

    expect(result).toBe(false);
  });

  it('Should call getCharacterStatus in DatabaseModule on iOS', async () => {
    const id = 1;

    require('react-native').NativeModules.DatabaseModule.getCharacterStatus.mockResolvedValueOnce(
      false,
    );

    const result = await getCharacterStatus(id);
    console.log(result);
    expect(
      require('react-native').NativeModules.DatabaseModule.disLikeCharacter,
    ).toHaveBeenCalledWith(id);

    expect(result).toBe(false);
  });
});
