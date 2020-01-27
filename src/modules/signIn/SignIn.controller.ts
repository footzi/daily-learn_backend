import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import randomstring from 'randomstring';
import SignInModel from './SignIn.model';
import TokenModel from '../tokens/Token.model';
import User from '../../entities/User';
import { ISignInController } from './i-signin';
import { checkTypeValue, sendData } from '../../utils';
import { typesError, errorMessage, errorTypeMessage } from '../../utils/errorHandler';
import { E } from '../../constans';

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
      await this.createTokens();
      this.send(res);
    } catch (error) {
      const code = typesError[error.type];
      const data = sendData('', errorMessage(error.content));

      res.status(code).send(data);
    }
  }

  private checkValue(): void {
    const { login, password } = this.body;
    const isValidLogin = checkTypeValue(login, 'string');
    const isValidPassword = checkTypeValue(password, 'string');

    if (!isValidLogin || !isValidPassword) {
      throw errorTypeMessage(E.invalid_data, 'Oт клиента получены неверные данные');
    }
  }

  private async getUser(): Promise<void> {
    try {
      const user = await SignInModel.getUser(this.body.login);

      if (user && user instanceof User) {
        this.user.id = user.id;
        this.user.password = user.password;
      }
    } catch (error) {
      throw errorTypeMessage(E.critical, error);
    }

    if (!this.user.id && !this.user.password) {
      throw errorTypeMessage(E.invalid_data, 'Данного пользователя не существует');
    }
  }

  private checkPassword(): void {
    const checkPassword = bcrypt.compareSync(this.body.password, this.user.password);

    if (!checkPassword) {
      throw errorTypeMessage(E.not_access, 'Неверный пароль');
    }
  }

  private async createTokens(): Promise<void> {
    const access = { id: this.user.id };
    const refresh = { id: this.user.id, key: randomstring.generate() };

    this.tokens.access = jwt.sign(access, CONFIG.secret, { expiresIn: CONFIG.expire_access });
    this.tokens.refresh = jwt.sign(refresh, CONFIG.secret, { expiresIn: CONFIG.expire_refresh });
    const decoded: any = jwt.decode(this.tokens.access, CONFIG.secret);
    this.tokens.expire = decoded ? decoded.exp : 0;

    await TokenModel.save({ userId: this.user.id, refresh: this.tokens.refresh });
  }

  private send(res: Response): void {
    const user = {
      id: this.user.id,
    };

    const data = sendData({ user, tokens: this.tokens });
    res.send(data);
  }
}
