export interface IUser {
  id: number;
  login: string;
  email?: string;
  password: string;
}

export interface IWord {
  id: number;
  name: string;
  translate: string;
  nameCount: number;
  translateCount: number;
  groupId: number;
  dictionaryId: number;
}

export interface ISaveWord {
  name: string;
  translate: string;
  nameCount: number;
  translateCount: number;
  groupId: number;
  dictionary: number;
}

export interface IDictionary {
  id: number;
  userId: number;
  name: string;
  words: Array<IWord>;
}

export interface IFormLogin {
  login: string;
  password: string;
}

export interface IErrorMessage {
  message: string;
  stack: string;
}

export interface IErrorTypeMessage {
  type: string;
  content: Error;
}
