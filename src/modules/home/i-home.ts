import { Request, Response } from 'express';
import { IDictionary } from '../../interfaces';

export interface IHomeController {
  userId: number;
  bd_dictionaries: Array<IDictionary>;
  dictionaries: Array<INormalizeDictionary>;
  getData(req: Request, res: Response): Promise<void>;
}

export interface INormalizeWords {
  id: number;
  name: string;
  translate: string;
  nameCount: number;
  translateCount: number;
  groupId: number;
}

export interface INormalizeDictionary {
  id: number;
  name: string;
  words: Array<INormalizeWords>;
}
