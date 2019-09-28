import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import randomstring from 'randomstring';
import SignInModel from './SignIn.model';
import TokenModel from '../tokens/Token.model';
import User from '../../entities/User';
import { ISignInController } from './i-signin';
import { checkTypeValue, errorMessage, errorTypeMessage, sendData } from '../../utils';

const CONFIG = require('../../../server.config.json');

export default class SignInController implements ISignInController {
  body: {
    login: string;
    password: string;
  };

  user: {
    id: number;
    password: string;
  };

  tokens: {
    access: string;
    refresh: string;
    expire: number;
  };

  constructor() {
    this.body = { login: '', password: '' };
    this.user = { id: 0, password: '' };
    this.tokens = { access: '', refresh: '', expire: 0 };
  }

  public async signIn(req: Request, res: Response): Promise<void> {
    this.body.login = req.body.login;
    this.body.password = req.body.password;

    try {
      this.checkValue();
      await this.getUser();
      this.checkPassword();
      this.createTokens();
      this.send(res);
    } catch (error) {
      const code = error.type === 'not_access' ? 403 : 500;
      const data = sendData('', errorMessage(error.content));

      res.status(code).send(data);
    }
  }

  private checkValue(): void {
    const { login, password } = this.body;
    const isValidLogin = checkTypeValue(login, 'string');
    const isValidPassword = checkTypeValue(password, 'string');

    if (!isValidLogin || !isValidPassword) {
      throw errorTypeMessage('not_access', 'Oт клиента получены неверные данные');
    }
  }

  private async getUser(): Promise<void> {
    try {
      const user = await SignInModel.signIn(this.body.login);

      if (user && user instanceof User) {
        this.user.id = user.id;
        this.user.password = user.password;
      }
    } catch (error) {
      throw errorTypeMessage('critical', error);
    }

    if (!this.user.id && !this.user.password) {
      throw errorTypeMessage('not_access', 'Данного пользователя не существует');
    }
  }

  private checkPassword(): void {
    const checkPassword = bcrypt.compareSync(this.body.password, this.user.password);

    if (!checkPassword) {
      throw errorTypeMessage('not_access', 'Неверный пароль');
    }
  }

  private createTokens(): void {
    const access = { id: this.user.id };
    const refresh = { id: this.user.id, key: randomstring.generate() };

    this.tokens.access = jwt.sign(access, CONFIG.secret, { expiresIn: CONFIG.expire_access });
    this.tokens.refresh = jwt.sign(refresh, CONFIG.secret, { expiresIn: CONFIG.expire_refresh });
    const decode = jwt.decode(this.tokens.access, CONFIG.secret);
    this.tokens.expire = decode ? decode.exp : 0;

    try {
      TokenModel.save({ userId: this.user.id, refresh: this.tokens.refresh });
    } catch (error) {
      throw errorTypeMessage('critical', error);
    }
  }

  private send(res: Response): void {
    const user = {
      id: this.user.id,
      access_token: this.tokens.access,
      refresh_token: this.tokens.refresh,
      expire: this.tokens.expire
    };
    const data = sendData({ user });
    res.send(data);
  }
}
