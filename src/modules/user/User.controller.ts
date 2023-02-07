import { Request, Response } from 'express';
import { sendData } from '../../utils';
import { typesError, errorMessage, errorTypeMessage } from '../../utils/errorHandler';
import { E, USER_REQUEST_FIELDS } from '../../constans';
import UserModel from './User.model';

export default class UserController {
  public static async get(req: Request, res: Response) {
    const { userId } = res.locals;

    try {
      const user = await UserModel.get(userId);

      if (!user) {
        throw errorTypeMessage(E.invalid_data, 'Такого пользователя не существует');
      }

      res.send(sendData({ success: true, user }));
    } catch (error) {
      // @ts-ignore
      const code = typesError[error.type];
      // @ts-ignore
      const data = sendData('', errorMessage(error.content));

      res.status(code).send(data);
    }
  }

  public static async change(req: Request, res: Response) {
    const { userId } = res.locals;

    try {
      const body = USER_REQUEST_FIELDS.reduce((acc: object, current: string) => {
        const field = req.body[current];

        if (field) {
          // @ts-ignore
          acc[current] = field;
        }

        return acc;
      }, {});

      if (Object.keys(body).length === 0) {
        throw errorTypeMessage(E.invalid_data, 'Oт клиента получены неверные данные');
      }

      await UserModel.change(userId, body);

      res.send(sendData({ success: true }));
    } catch (error) {
      // @ts-ignore
      const code = typesError[error.type];
      // @ts-ignore
      const data = sendData('', errorMessage(error.content));

      res.status(code).send(data);
    }
  }
}
