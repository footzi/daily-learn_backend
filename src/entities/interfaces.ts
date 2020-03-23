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
  count: number;
  groupId: number;
}

export interface IDictionary {
  id: number;
  userId: number;
  name: string;
  words: Array<IWord>;
}

export interface IIrregularVerbs {
  id: number;
  first: string;
  second: string;
  third: string;
  translate: string;
  user_count: Array<IUserIrregularVerbs>;
}

export interface IUserIrregularVerbs {
  id: number;
  userId: number;
  first_count: number;
  second_count: number;
  third_count: number;
  translate_count: number;
}
