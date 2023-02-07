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
import CONFIG from '../../config';

const { JWT_SECRET, JWT_EXPIRES_IN, JWT_REFRESH_EXPIRES_IN } = CONFIG;

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
      // @ts-ignore
      const code = typesError[error.type];
      // @ts-ignore
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
    const user = await SignInModel.getUser(this.body.login);

    if (user && user instanceof User) {
      this.user = user;
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

    this.tokens.access = jwt.sign(access, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    this.tokens.refresh = jwt.sign(refresh, JWT_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });
    // @ts-ignore
    const decoded: any = jwt.decode(this.tokens.access, JWT_SECRET);
    this.tokens.expire = decoded ? decoded.exp : 0;

    await TokenModel.save({ userId: this.user.id, refresh: this.tokens.refresh });
  }

  private send(res: Response): void {
    const tokens = {
      access_token: this.tokens.access,
      refresh_token: this.tokens.refresh,
      expire: this.tokens.expire,
    };

    if (this.user.password) {
      // @ts-ignore
      delete this.user.password;
    }

    const data = sendData({ user: this.user, tokens });
    res.send(data);
  }
}
