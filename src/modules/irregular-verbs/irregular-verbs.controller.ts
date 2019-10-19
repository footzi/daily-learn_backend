import { Request, Response } from 'express';
import IrreguralVerbsModel from './irregular-verbs.model';
import { sendData, checkTypeValue } from '../../utils';
import { typesError, errorMessage, errorTypeMessage } from '../../utils/errorHandler';
import { E } from '../../constans';

export default class IrreguralVerbsController {
  public static async changeCount(req: Request, res: Response): Promise<void> {
    const { verb_id, form } = req.body;
    const { userId } = res.locals;

    try {
      const isValidId = checkTypeValue(verb_id, 'string');
      const isValidLang = checkTypeValue(form, 'string');

      if (!isValidId || !isValidLang) {
        throw errorTypeMessage(E.invalid_data, 'Oт клиента получены неверные данные');
      }

      const hasVerbs = await IrreguralVerbsModel.has({ userId, verb_id });

      if (hasVerbs) {
        await IrreguralVerbsModel.update({ userId, verb_id, form });
      } else {
        await IrreguralVerbsModel.save({ userId, verb_id, form });
      }

      res.send(sendData({ success: true }));
    } catch (error) {
      const code = typesError[error.type];
      const data = sendData('', errorMessage(error.content));

      res.status(code).send(data);
    }
  }
}
