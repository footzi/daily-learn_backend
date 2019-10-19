export interface IGetAllIrregular {
  userId: number;
}

export interface IHasIrregular {
  userId: number;
  verb_id: number;
}

export interface ISaveIrregular {
  userId: number;
  verb_id: number;
  form: string;
}

export interface IUpdateIrregular {
  userId: number;
  verb_id: number;
  form: string;
}
