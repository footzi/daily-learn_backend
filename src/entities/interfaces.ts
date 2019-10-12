export interface IUser {
  id: number;
  login: string;
  email?: string;
  password: string;
}

export interface IWord {
  id: number;
  ru: string;
  en: string;
  en_count: number;
  ru_count: number;
}

export interface IDictionary {
  id: number;
  userId: number;
  name: string;
  words: Array<IWord>;
}
