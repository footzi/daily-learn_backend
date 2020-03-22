import { Request, Response } from 'express';
import WordsModel from './Words.model';
import { sendData, checkTypeValue } from '../../utils';
import { typesError, errorMessage, errorTypeMessage } from '../../utils/errorHandler';
import { E } from '../../constans';

export default class WordsController {
  public static async create(req: Request, res: Response): Promise<void> {
    const { name, translate, dictionary_id } = req.body;
    const dictionary = {
      id: Number(dictionary_id)
    };

    // console.log(name);
    // console.log(translate);
    // console.log(typeof translate);
    // console.log(typeof name);

    // console.log(Number(Date.now()));
    //

    console.log(req.body);

    try {
      const groudId = await WordsModel.getLastGroupId();

      const data = translate.map((item, index) => {
        const word = {};

        word.name = name[index] ? name[index] : name[0];
        word.translate = item;
        word.dictionaryId = Number(dictionary_id);
        word.groupId = groudId + 1;
        word.count = 0;

        return word
      })

      const id = await WordsModel.save(data);
      console.log(id);
    } catch (e) {
      console.log(e);
    }

    //console.log(data);

    // try {
    //   const isValidEn = checkTypeValue(en, 'string');
    //   const isValidRu = checkTypeValue(ru, 'string');
    //   const isValidId = checkTypeValue(dictionary_id, 'string');
    //
    //   if (!isValidEn || !isValidRu || !isValidId) {
    //     throw errorTypeMessage(E.invalid_data, 'Oт клиента получены неверные данные');
    //   }
    //
    //   const id = await WordsModel.save({ en, ru, dictionary });
    //
    //   res.send(sendData({ success: true, id }));
    // } catch (error) {
    //   const code = typesError[error.type];
    //   const data = sendData('', errorMessage(error.content));
    //
    //   res.status(code).send(data);
    // }
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

  public static async delete(req: Request, res: Response): Promise<void> {
    const { ids } = req.body;

    try {
      const isValid = checkTypeValue(ids, 'string');

      if (!isValid) {
        throw errorTypeMessage(E.invalid_data, 'Oт клиента получены неверные данные');
      }

      const ids_number = ids.split(',').map((item: string) => Number(item));

      await WordsModel.delete(ids_number);

      res.send(sendData({ success: true }));
    } catch (error) {
      const code = typesError[error.type];
      const data = sendData('', errorMessage(error.content));

      res.status(code).send(data);
    }
  }
}
