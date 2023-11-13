import {
  ApiCharacter,
  ApiCharacterLocation,
  ApiCharacterResponse,
  ApiResponseInfo,
} from '../APIModel/ApiCharacterModel';

export class DomainCharacterResponse {
  info: DomainResponseInfo;
  results: Array<DomainCharacter>;

  constructor(model: ApiCharacterResponse) {
    this.info = model.info;
    this.results = model.results;
  }
}

export class DomainResponseInfo {
  count: number;
  pages: number;
  next: string;
  previous: string;

  constructor(model: ApiResponseInfo) {
    this.count = model.count;
    this.pages = model.pages;
    this.next = model.next;
    this.previous = model.previous;
  }
}

export class DomainCharacter {
  id: number;
  name: string;
  status: string;
  image: string;
  location: DomainCharacterLocation;

  constructor(model: ApiCharacter) {
    this.name = model.name;
    this.id = model.id;
    this.status = model.status;
    this.image = model.image;
    this.location = model.location;
  }
}

export class DomainCharacterLocation {
  name: string;

  constructor(model: ApiCharacterLocation) {
    this.name = model.name;
  }
}
