import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import randomstring from 'randomstring';
import TokenModel from './Token.model';
import Tokens from '../../entities/Tokens';
import { parseBearer, sendData } from '../../utils';
import { ITokensController } from './i-tokens';
import { typesError, errorMessage, errorTypeMessage } from '../../utils/errorHandler';
import { E } from '../../constans';

const CONFIG = require('../../../server.config.json');

export default class RefreshController implements ITokensController {
  refresh_token: string;

  decoded: { id: number };

  user: { id: number; refresh: string };

  newtokens: {
    access: string;
    refresh: string;
    expire: number;
  };

  constructor() {
    this.refresh_token = '';
    this.decoded = { id: 0 };
    this.user = {
      id: 0,
      refresh: '',
    };
    this.newtokens = { access: '', refresh: '', expire: 0 };
  }

  static check(req: Request, res: Response, next: Function): void {
    if (!req.headers.authorization) {
      const data = sendData('', errorMessage(new Error('Нет заголовка авторизации')));

      res.status(403).send(data);
      return;
    }

    const token = parseBearer(req.headers.authorization);

    jwt.verify(token, CONFIG.secret, (err: any, decoded: any) => {
      if (decoded) {
        res.locals.userId = decoded.id;
        next();
      } else {
        const data = sendData('', errorMessage(new Error(err.message)));

        res.status(401).send(data);
      }
    });
  }

  public async refresh(req: Request, res: Response): Promise<void> {
    try {
      this.getToken(req.headers.authorization);
      this.getUserId();
      await this.getUser();
      this.compareTokens();
      await this.createTokens();
      this.send(res);
    } catch (error) {
      const code = typesError[error.type];
      const data = sendData('', errorMessage(error.content));

      res.status(code).send(data);
    }
  }

  getToken(header: string | undefined): void {
    if (header) {
      this.refresh_token = parseBearer(header);
    } else {
      throw errorTypeMessage(E.invalid_data, 'Токен не получен');
    }
  }

  getUserId(): void {
    try {
      const decoded: any = jwt.verify(this.refresh_token, CONFIG.secret);

      if (typeof decoded === 'object') {
        this.decoded.id = decoded.id;
      } else {
        throw errorTypeMessage(E.not_access, 'Ошибка чтения токена');
      }
    } catch (err) {
      throw errorTypeMessage(E.not_access, err.message);
    }
  }

  async getUser(): Promise<void> {
    try {
      const response = await TokenModel.get(this.decoded.id);

      if (response && response instanceof Tokens) {
        this.user.id = response.userId;
        this.user.refresh = response.refresh;
      }
    } catch (error) {
      throw errorTypeMessage(E.critical, error);
    }

    if (!this.user) {
      throw errorTypeMessage(E.not_access, 'Для данного пользователя отказано в доступе');
    }
  }

  compareTokens(): void {
    const db_token = this.user.refresh;

    if (JSON.stringify(db_token) !== JSON.stringify(this.refresh_token)) {
      throw errorTypeMessage(E.not_access, 'Токены не совпадают');
    }
  }

  async createTokens(): Promise<void> {
    const access = { id: this.user.id };
    const refresh = { id: this.user.id, key: randomstring.generate() };

    this.newtokens.access = jwt.sign(access, CONFIG.secret, { expiresIn: CONFIG.expire_access });
    this.newtokens.refresh = jwt.sign(refresh, CONFIG.secret, { expiresIn: CONFIG.expire_refresh });
    const decoded: any = jwt.decode(this.newtokens.access, CONFIG.secret);
    this.newtokens.expire = decoded ? decoded.exp : 0;

    await TokenModel.save({ userId: this.user.id, refresh: this.newtokens.refresh });
  }

  send(res: Response): void {
    const tokens = {
      access_token: this.newtokens.access,
      refresh_token: this.newtokens.refresh,
      expire: this.newtokens.expire,
    };
    const data = sendData({ tokens });
    res.send(data);
  }
}
