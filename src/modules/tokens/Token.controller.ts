import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import randomstring from 'randomstring';
import { IPayloadRefreshToken, IToken } from '../../interfaces';
import TokenModel from './Token.model';
import { errorMessage, errorTypeMessage, parseBearer, sendData } from '../../utils';

const CONFIG = require('../../../server.config.json');

export default class RefreshController {
  refresh_token: string;
  payload: IPayloadRefreshToken;
  user: IToken;
  newtokens: {
    access: string;
    refresh: string;
  };

  constructor() {
    this.refresh_token = '';
    this.user = { userId: 0, refresh: '' };
    this.payload = { id: 0 };
    this.newtokens = { access: '', refresh: '' };
  }

  public async refresh(req: Request, res: Response) {
    try {
      this.getToken(req.headers.authorization);
      // this.checkToken();
      // await this.getUser();
      // this.compareTokens();
      // await this.createTokens();
      // this.send(res);
    } catch (error) {
      const code = error.type === 'not_access' ? 403 : 500;
      const data = sendData('', errorMessage(error.content));

      res.status(code).send(data);
    }
  }

  getToken(header: string | undefined): void {
    if (header) {
      this.refresh_token = parseBearer(header);
    } else {
      throw errorTypeMessage('not_access', 'Токен не получен');
    }
  }

  checkToken() {
    // @ts-ignore
    jwt.verify(this.refresh_token, SECRET, (error: Error, payload: IPayloadRefreshToken) => {
      if (error) {
        throw errorTypeMessage('not_access', 'Токен не действителен');
      }

      this.payload = payload;
    });
  }

  async getUser() {
    try {
      this.user = await TokenModel.get(this.payload.id);
    } catch (error) {
      throw errorTypeMessage('critical', error);
    }

    if (!this.user) {
      throw errorTypeMessage('not_access', 'Для данного пользователя отказано в доступе');
    }
  }

  compareTokens() {
    const db_token = this.user.refresh;

    if (JSON.stringify(db_token) !== JSON.stringify(this.refresh_token)) {
      throw errorTypeMessage('not_access', 'Токены не совпадают');
    }
  }

  createTokens() {
    const access = { id: this.user.userId };
    const refresh = { id: this.user.userId, key: randomstring.generate() };
    this.newtokens.access = jwt.sign(access, CONFIG.secret, { expiresIn: CONFIG.expire_access });
    this.newtokens.refresh = jwt.sign(refresh, CONFIG.secret, { expiresIn: CONFIG.expire_refresh });

    TokenModel.update(this.user.userId, this.newtokens.refresh);
  }

  send(res: Response) {
    const response = { access_token: this.newtokens.access, refresh_token: this.newtokens.refresh };
    res.send({ user: response });
  }
}
