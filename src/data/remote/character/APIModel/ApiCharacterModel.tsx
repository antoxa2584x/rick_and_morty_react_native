export interface ApiCharacterResponse {
  info: ApiResponseInfo;
  results: Array<ApiCharacter>;
}

export interface ApiResponseInfo {
  count: number;
  pages: number;
  next: string;
  previous: string;
}

export interface ApiCharacter {
  id: number;
  name: string;
  status: string;
  image: string;
  location: ApiCharacterLocation;
}

export interface ApiCharacterLocation {
  name: string;
}
