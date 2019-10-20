import { Request, Response } from 'express';
import DictionaryModel from '../dictionary/Dictionary.model';
import IrreguralVerbsModel from '../irregular-verbs/irregular-verbs.model';
import { IDictionary, IIrregularVerbs } from '../../entities/interfaces';
import { sendData } from '../../utils';
import { typesError, errorMessage, errorTypeMessage } from '../../utils/errorHandler';
import { E } from '../../constans';
import { INormalizeDictionary } from './i-home';
import { normailizeDictionaties } from './normalize';

export default class HomeController {
  userId: number;

  dictionaries: Array<INormalizeDictionary>;

  irreguralVerbs: Array<IIrregularVerbs>;

  bd_dictionaries: Array<IDictionary>;

  bd_irreguralVerbs: Array<IIrregularVerbs>;

  constructor() {
    this.userId = 0;
    this.bd_dictionaries = [];
    this.bd_irreguralVerbs = [];
    this.dictionaries = [];
    this.irreguralVerbs = [];
  }

  public async getData(req: Request, res: Response): Promise<void> {
    this.userId = res.locals.userId;

    try {
      await this.getDictionaties();
      await this.getIrreguralVerbs();

      this.dictionaries = normailizeDictionaties(this.bd_dictionaries);
      this.irreguralVerbs = this.bd_irreguralVerbs;

      this.send(res);
    } catch (error) {
      const code = typesError[error.type];
      const data = sendData('', errorMessage(error.content));

      res.status(code).send(data);
    }
  }

  private async getIrreguralVerbs(): Promise<void> {
    try {
      const verbs = await IrreguralVerbsModel.getAll({ userId: this.userId });

      if (verbs instanceof Array) {
        this.bd_irreguralVerbs = verbs;
      }
    } catch (error) {
      throw errorTypeMessage(E.critical, error);
    }
  }

  private async getDictionaties(): Promise<void> {
    try {
      const dictionaries = await DictionaryModel.getAll({ userId: this.userId });

      if (dictionaries instanceof Array) {
        this.bd_dictionaries = dictionaries;
      }
    } catch (error) {
      throw errorTypeMessage(E.critical, error);
    }
  }

  private send(res: Response): void {
    const data = sendData({ dictionaries: this.dictionaries, irregularVerbs: this.irreguralVerbs });
    res.send(data);
  }
}
