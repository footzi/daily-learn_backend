import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import SignOutModel from './signOut.model';
import { parseBearer, sendData } from '../../utils';
import { typesError, errorMessage, errorTypeMessage } from '../../utils/errorHandler';
import { E } from '../../constans';

const CONFIG = require('../../../server.config.json');

export default class SignOutController {
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
      const code = typesError[error.type];
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
      const decoded: any = jwt.verify(this.access_token, CONFIG.secret);

      if (typeof decoded === 'object') {
        this.decoded.id = decoded.id;
      } else {
        throw errorTypeMessage(E.not_access, 'Ошибка чтения токена');
      }
    } catch (err) {
      throw errorTypeMessage(E.not_access, err.message);
    }
  }

  async removeToken(): Promise<void> {
    await SignOutModel.delete(this.decoded.id);
  }
}
