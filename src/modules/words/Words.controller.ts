import { Request, Response } from 'express';
import WordsModel from './Words.model';
import { ISaveWord } from '../../interfaces';
import { sendData, checkTypeValue } from '../../utils';
import { typesError, errorMessage, errorTypeMessage } from '../../utils/errorHandler';
import { E } from '../../constans';

export default class WordsController {
  public static async create(req: Request, res: Response): Promise<void> {
    const { name, translate, dictionary_id } = req.body;

    try {
      const isValidName = checkTypeValue(name, 'string');
      const isValidTranslate = checkTypeValue(translate, 'string');
      const isValidId = checkTypeValue(dictionary_id, 'string');

      if (!isValidName || !isValidTranslate || !isValidId) {
        throw errorTypeMessage(E.invalid_data, 'Oт клиента получены неверные данные');
      }

      const lastGroupId = await WordsModel.getLastGroupId();
      const names = JSON.parse(name);
      const translates = JSON.parse(translate);

      const data = translates.map((item: string, index: number) => {
        const word: ISaveWord = { name: '', translate: '', dictionary: 0, groupId: 0, nameCount: 0, translateCount: 0};

        word.name = names[index] ? names[index] : names[0];
        word.translate = item;
        word.dictionary = Number(dictionary_id);
        word.groupId = typeof lastGroupId === 'number' ? lastGroupId + 1 : 0;

        return word;
      });

      const item = await WordsModel.save(data);
      const groupId = Array.isArray(item) ? item[0].groupId : null;

      res.send(sendData({ success: true, groupId }));
    } catch (error) {
      const code = typesError[error.type];
      const data = sendData('', errorMessage(error.content));

      res.status(code).send(data);
    }
  }

  public static async changeCount(req: Request, res: Response): Promise<void> {
    const { id, type } = req.body;

    try {
      const isValidId = checkTypeValue(id, 'string');
      const isValidType = checkTypeValue(type, 'string');

      if (!isValidId || !isValidType) {
        throw errorTypeMessage(E.invalid_data, 'Oт клиента получены неверные данные');
      }

      await WordsModel.update({ id, type });

      res.send(sendData({ success: true }));
    } catch (error) {
      const code = typesError[error.type];
      const data = sendData('', errorMessage(error.content));

      res.status(code).send(data);
    }
  }

  public static async delete(req: Request, res: Response): Promise<void> {
    const { ids } = req.body;

    try {
      const isValid = checkTypeValue(ids, 'string');

      if (!isValid) {
        throw errorTypeMessage(E.invalid_data, 'Oт клиента получены неверные данные');
      }

      await WordsModel.delete(JSON.parse(ids));

      res.send(sendData({ success: true }));
    } catch (error) {
      const code = typesError[error.type];
      const data = sendData('', errorMessage(error.content));

      res.status(code).send(data);
    }
  }
}
