import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import SignOutModel from './signOut.model';
import { parseBearer, sendData } from '../../utils';
import { typesError, errorMessage, errorTypeMessage } from '../../utils/errorHandler';
import { E } from '../../constans';
import { ISignOutController } from './i-signout';
import CONFIG from '../../config';

const { JWT_SECRET } = CONFIG;

export default class SignOutController implements ISignOutController {
  access_token: string;

  decoded: { id: number };

  constructor() {
    this.access_token = '';
    this.decoded = { id: 0 };
  }

  public async signOut(req: Request, res: Response): Promise<void> {
    try {
      this.getToken(req.headers.authorization);
      this.getUserId();
      await this.removeToken();

      res.send(sendData({ success: true }));
    } catch (error) {
      // @ts-ignore
      const code = typesError[error.type];
      // @ts-ignore
      const data = sendData('', errorMessage(error.content));

      res.status(code).send(data);
    }
  }

  getToken(header: string | undefined): void {
    if (header) {
      this.access_token = parseBearer(header);
    } else {
      throw errorTypeMessage(E.invalid_data, 'Токен не получен');
    }
  }

  getUserId(): void {
    try {
      const decoded: any = jwt.verify(this.access_token, JWT_SECRET);

      if (typeof decoded === 'object') {
        this.decoded.id = decoded.id;
      } else {
        throw errorTypeMessage(E.not_access, 'Ошибка чтения токена');
      }
    } catch (err) {
      // @ts-ignore
      throw errorTypeMessage(E.not_access, err.message);
    }
  }

  async removeToken(): Promise<void> {
    await SignOutModel.delete(this.decoded.id);
  }
}
