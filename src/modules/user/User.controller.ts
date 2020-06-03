import { Request, Response } from 'express';
import { sendData } from '../../utils';
import { typesError, errorMessage, errorTypeMessage } from '../../utils/errorHandler';
import { E } from '../../constans';
import UserModel from './User.model';
import { clearScreenDown } from 'readline';

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
      const code = typesError[error.type];
      const data = sendData('', errorMessage(error.content));

      res.status(code).send(data);
    }
  }

  public static async change(req: Request, res: Response) {
    const { userId } = res.locals;
    const fields = ['login', 'email', 'paws'];

    const body = fields.reduce((acc, current) => {
        const field = req.body[current];
        
        if (field) {
            acc[current] = field;
        }

        return acc;
    }, {});

    const { login, email, paws } = req.body;

    console.log(login, email, paws)
    console.log(req.body);


    try {
        const a = await UserModel.change(userId, req.body)
    } catch (error) {
        console.log(error);
      const code = typesError[error.type];
      const data = sendData('', errorMessage(error.content));

      res.status(code).send(data);
    }
  }
}
