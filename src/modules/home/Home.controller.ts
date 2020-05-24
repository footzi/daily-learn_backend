import { Request, Response } from 'express';
import DictionaryModel from '../dictionary/Dictionary.model';
import { IDictionary } from '../../interfaces';
import { sendData } from '../../utils';
import { typesError, errorMessage } from '../../utils/errorHandler';
import { INormalizeDictionary } from './i-home';
import { normailizeDictionaries } from './normalize';

export default class HomeController {
  userId: number;

  dictionaries: Array<INormalizeDictionary>;

  bd_dictionaries: Array<IDictionary>;

  constructor() {
    this.userId = 0;
    this.bd_dictionaries = [];
    this.dictionaries = [];
  }

  public async getData(req: Request, res: Response): Promise<void> {
    this.userId = res.locals.userId;

    try {
      await this.getDictionaries();
      this.dictionaries = normailizeDictionaries(this.bd_dictionaries);

      this.send(res);
    } catch (error) {
      const code = typesError[error.type];
      const data = sendData('', errorMessage(error.content));

      res.status(code).send(data);
    }
  }

  private async getDictionaries(): Promise<void> {
    const dictionaries = await DictionaryModel.getAll({ userId: this.userId });

    if (Array.isArray(dictionaries)) {
      // @ts-ignore
      this.bd_dictionaries = dictionaries;
    }
  }

  private send(res: Response): void {
    const data = sendData({ dictionaries: this.dictionaries });
    res.send(data);
  }
}
