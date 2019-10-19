import { Request, Response } from 'express';
import WordsModel from './Words.model';
import { sendData, checkTypeValue } from '../../utils';
import { typesError, errorMessage, errorTypeMessage } from '../../utils/errorHandler';
import { E } from '../../constans';

export default class WordsController {
  public static async create(req: Request, res: Response): Promise<void> {
    const { en, ru, dictionary_id } = req.body;
    const dictionary = {
      id: Number(dictionary_id)
    };

    try {
      const isValidEn = checkTypeValue(en, 'string');
      const isValidRu = checkTypeValue(ru, 'string');
      const isValidId = checkTypeValue(dictionary_id, 'string');

      if (!isValidEn || !isValidRu || !isValidId) {
        throw errorTypeMessage(E.invalid_data, 'Oт клиента получены неверные данные');
      }

      await WordsModel.save({ en, ru, dictionary });

      res.send(sendData({ success: true }));
    } catch (error) {
      const code = typesError[error.type];
      const data = sendData('', errorMessage(error.content));

      res.status(code).send(data);
    }
  }

  public static async changeCount(req: Request, res: Response): Promise<void> {
    const { words_id, lang } = req.body;

    try {
      const isValidId = checkTypeValue(words_id, 'string');
      const isValidLang = checkTypeValue(lang, 'string');

      if (!isValidId || !isValidLang) {
        throw errorTypeMessage(E.invalid_data, 'Oт клиента получены неверные данные');
      }

      await WordsModel.update({ words_id, lang });

      res.send(sendData({ success: true }));
    } catch (error) {
      const code = typesError[error.type];
      const data = sendData('', errorMessage(error.content));

      res.status(code).send(data);
    }
  }
}
