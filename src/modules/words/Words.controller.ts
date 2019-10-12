import { Request, Response } from 'express';
import WordsModel from './Words.model';
import { sendData } from '../../utils';
import { typesError, errorMessage } from '../../utils/errorHandler';

export default class WordsController {
  public static async create(req: Request, res: Response): Promise<void> {
    const { en, ru, dictionary_id } = req.body;
    const dictionary = {
      id: Number(dictionary_id)
    };

    try {
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
      await WordsModel.update({ words_id, lang });

      res.send(sendData({ success: true }));
    } catch (error) {
      const code = typesError[error.type];
      const data = sendData('', errorMessage(error.content));

      res.status(code).send(data);
    }
  }
}
