import { Request, Response } from 'express';
import DictionaryModel from './Dictionary.model';
import { sendData, checkTypeValue } from '../../utils';
import { typesError, errorMessage, errorTypeMessage } from '../../utils/errorHandler';
import { E } from '../../constans';

export default class DictionaryController {
  public static async create(req: Request, res: Response): Promise<void> {
    const { userId } = res.locals;
    const { name } = req.body;

    try {
      const isValidName = checkTypeValue(name, 'string');

      if (!isValidName) {
        throw errorTypeMessage(E.invalid_data, 'Oт клиента получены неверные данные');
      }

      const hasDictionary = await DictionaryModel.has({ userId, name });

      if (!hasDictionary) {
        await DictionaryModel.save({ userId, name });

        res.send(sendData({ success: true }));
      } else {
        throw errorTypeMessage(E.invalid_data, 'Словарь с таким именем уже существует');
      }
    } catch (error) {
      const code = typesError[error.type];
      const data = sendData('', errorMessage(error.content));

      res.status(code).send(data);
    }
  }

  public static async getAll(req: Request, res: Response): Promise<void> {
    const { userId } = res.locals;

    try {
      const dictionaries = await DictionaryModel.getAll({ userId });

      res.send(sendData({ dictionaries }));
    } catch (error) {
      const code = typesError[error.type];
      const data = sendData('', errorMessage(error.content));

      res.status(code).send(data);
    }
  }
}
