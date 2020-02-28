export interface ISaveWords {
  ru: string;
  en: string;
  dictionary: {
    id: number;
  };
}

export interface IUpdateWords {
  words_id: number;
  lang: string;
}

export type IDeleteWords {
  number[]
}
