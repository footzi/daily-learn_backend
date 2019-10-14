import { Request, Response } from 'express';
import DictionaryModel from '../dictionary/Dictionary.model';
import { IDictionary, IWord } from '../../entities/interfaces';
import { sendData } from '../../utils';
import { typesError, errorMessage, errorTypeMessage } from '../../utils/errorHandler';
import { E } from '../../constans';
import { INormalizeDictionary, INormalizeWords } from './i-home';

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
      await this.getDictionaties();
      this.normailizeDictionaties();
      this.send(res);
    } catch (error) {
      const code = typesError[error.type];
      const data = sendData('', errorMessage(error.content));

      res.status(code).send(data);
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

  private normailizeDictionaties(): void {
    const normalizeWords = (words: Array<IWord>): Array<INormalizeWords> => {
      return words.map(item => {
        const { id, en, ru, en_count, ru_count } = item;
        return {
          id,
          en: {
            name: en,
            count: en_count
          },
          ru: {
            name: ru,
            count: ru_count
          }
        };
      });
    };

    this.dictionaries = this.bd_dictionaries.map(
      (item: IDictionary): INormalizeDictionary => {
        const { id, name, words } = item;
        return {
          id,
          name,
          words: normalizeWords(words)
        };
      }
    );
  }

  private send(res: Response): void {
    const data = sendData({ dictionaries: this.dictionaries });
    res.send(data);
  }
}
