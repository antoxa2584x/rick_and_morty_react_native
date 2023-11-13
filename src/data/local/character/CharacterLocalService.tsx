import {NativeModules, Platform} from 'react-native';

const {DatabaseModule} = NativeModules;

export async function likeCharacter(id: number): Promise<boolean> {
  if (Platform.OS === 'android') {
    return await DatabaseModule.likeCharacter(id);
  } else {
    return Promise.resolve(false);
  }
}

export async function disLikeCharacter(id: number): Promise<boolean> {
  if (Platform.OS === 'android') {
    return await DatabaseModule.disLikeCharacter(id);
  } else {
    return Promise.resolve(false);
  }
}

export async function getCharacterStatus(id: number): Promise<boolean> {
  if (Platform.OS === 'android') {
    return await DatabaseModule.getCharacterStatus(id);
  } else {
    return Promise.resolve(false);
  }
}
